import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '@/styles/Search.module.css'

const Search = () => {
  const [term, setTerm] = useState('')

  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()

    router.push(`/events/search?term=${term}`)
    setTerm('')
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Search
