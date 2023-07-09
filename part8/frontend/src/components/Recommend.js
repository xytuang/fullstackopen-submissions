import { useQuery } from "@apollo/client"
import { ME, ALL_BOOKS } from "../queries"


const Recommend = ({show}) => {
    const result = useQuery(ALL_BOOKS)
    const user = useQuery( ME )

    if (result.loading){
        return null
    }

    if (!show){
        return null
    }

    return (
        <div>
          <h2>books</h2>
          <p>in genre {user.data.me.favoriteGenre}</p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {result.data.allBooks.filter(a => a.genres.indexOf(user.data.me.favoriteGenre) !== -1).map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
}

export default Recommend