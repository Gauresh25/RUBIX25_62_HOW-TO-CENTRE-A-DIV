import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import eventsData from '../data/historyEvents'
import FlyToMarker from './FlyToMarker'
import Filter from './Filter'

// Fix the default icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const defaultPosition = [51.505, -0.09]

function MapsApp() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [activeEvent, setActiveEvent] = useState(null)
    const [favourites, setFavourites] = useState(() => {
        const savedFavorites = localStorage.getItem("favourites")
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    const handleFavouriteClick = (eventId) => {
        let updatedFavourites = favourites.filter((id) => id !== eventId)
        if (!favourites.includes(eventId)) {
            updatedFavourites = [eventId, ...updatedFavourites]
        }
        setFavourites(updatedFavourites)
        localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
    }

    const handleListItemClick = (eventId) => {
        const event = eventsData.find((event) => event.id === eventId)
        if (event) {
            setActiveEvent(event)
        }
    }

    return (
        <div className="content">
            <div className="map-content">
                <Filter setSelectedCategory={setSelectedCategory} />
                <MapContainer 
                    center={defaultPosition} 
                    zoom={13} 
                    scrollWheelZoom={true}
                    className="map-container"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {eventsData
                        .filter((event) => !selectedCategory || event.category === selectedCategory)
                        .map((event) => (
                            <Marker
                                key={event.id}
                                position={event.position}
                                eventHandlers={{
                                    click: () => {
                                        setActiveEvent(event)
                                    },
                                }}
                            >
                                {activeEvent && activeEvent.id === event.id && (
                                    <Popup>
                                        <div className="popup-inner">
                                            <h2 className="popup-inner__title">{event.title}</h2>
                                            <p className="popup-inner__description">
                                                {event.description}
                                            </p>
                                            <button
                                                className="popup-inner__button"
                                                onClick={() => handleFavouriteClick(event.id)}
                                            >
                                                {favourites.includes(event.id) ? (
                                                    <span>⭐ Unfavorite</span>
                                                ) : (
                                                    <span>☆ Favorite</span>
                                                )}
                                            </button>
                                        </div>
                                    </Popup>
                                )}
                            </Marker>
                        ))}
                    {activeEvent && (
                        <FlyToMarker position={activeEvent.position} zoomLevel={15} />
                    )}
                </MapContainer>
            </div>

            <div className="liked-events">
                <h2 className="liked-events__title">
                    <span>⭐</span> Favourite Events
                </h2>
                <ul>
                    {favourites
                        .map((id) => eventsData.find((event) => event.id === id))
                        .map((event) => (
                            event && (
                                <li
                                    key={event.id}
                                    className="liked-events__event"
                                    onClick={() => handleListItemClick(event.id)}
                                >
                                    <h3>{event.title}</h3>
                                </li>
                            )
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default MapsApp