import { useState, useEffect } from 'react'

function Filter({ setSelectedCategory }) {
  const categories = [
    "War",
    "Art",
    "Science",
    "Politics",
    "Religion",
    "Sports",
    "Other",
  ]

  const [theme, setTheme] = useState("dark-theme")

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const changeTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme")
  }

  return (
    <div className="filter">
      <div className="filter__select">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="theme-toggler">
        <input
          type="checkbox"
          id="theme-toggler__checkbox"
          className="theme-toggler__checkbox"
        />
        <label
          htmlFor="theme-toggler__checkbox"
          className="theme-toggler__label"
          onClick={changeTheme}
        >
          Toggle
        </label>
      </div>
    </div>
  )
}

export default Filter