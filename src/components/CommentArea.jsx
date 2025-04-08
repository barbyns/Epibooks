import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      if (!asin) return

      setIsLoading(true)
      setIsError(false)

      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' + asin,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzg1NzM4MzRiZjAwMTUwMDA3MTgiLCJpYXQiOjE3NDQxMTc3MjMsImV4cCI6MTc0NTMyNzMyM30.xSGsddyhsYbOfBwv6-lXc6jGrdN0M82J4ml2iBYsz18',
            },
          }
        )

        if (response.ok) {
          const data = await response.json()
          setComments(data)
        } else {
          setIsError(true)
        }
      } catch (error) {
        console.error('Errore nel fetch dei commenti:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [asin]) // si attiva ogni volta che cambia asin

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
