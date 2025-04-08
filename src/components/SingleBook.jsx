import { useState } from 'react'
import { Card } from 'react-bootstrap'
// import CommentArea from './CommentArea'

const SingleBook = ({ book, selectedBook, changeSelectedBook }) => {
  // Inizialmente il libro non è selezionato
  const [selected, setSelected] = useState(false)

  const handleCardClick = () => {
    // Cambia lo stato locale per mostrare o nascondere CommentArea (se la usi)
    setSelected(!selected)
    // Notifica al componente genitore quale libro è selezionato
    changeSelectedBook(book.asin)
  }

  return (
    <>
      <Card
        onClick={handleCardClick}
        style={{
          border: selectedBook === book.asin ? '3px solid red' : 'none',
          cursor: 'pointer',
        }}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>

      {/* {selected && <CommentArea asin={book.asin} />} */}
    </>
  )
}

export default SingleBook
