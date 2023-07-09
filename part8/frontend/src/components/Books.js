import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  
  const [books, setBooks] = useState([])

  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, {variables: {genre: (selectedGenre.length > 0) ? ((selectedGenre !== 'All genres') ? selectedGenre : undefined) : undefined}})

  useEffect(() => {
    if (result.data) {
      const allBooks = result.data.allBooks
      setBooks(allBooks)
      let genres = ['All genres']
      allBooks.forEach((element) => {
        element.genres.forEach((g) => {
          if (genres.indexOf(g) === -1) {
            genres.push(g)
          }
        })
      })
      setGenres(genres)
      setSelectedGenre(selectedGenre)
    }
  },[result])

  if (!props.show) {
    return null
  }
  if (result.loading){
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre {selectedGenre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      {genres.length > 0 &&
          genres.map((g) => (
            <button onClick={() => setSelectedGenre(g)} key={g}>
              {g}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books
