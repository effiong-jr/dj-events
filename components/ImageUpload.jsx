import { useState } from 'react'
import { parseCookie } from '../helpers'

import styles from '@/styles/Form.module.css'

const ImageUpload = ({ eventId, imageUploaded, token }) => {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const API_URL = process.env.API_URL

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleFileUploaded = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData()
    formData.append('files', image)
    formData.append('refId', eventId)
    formData.append('ref', 'events')
    formData.append('field', 'image')

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      imageUploaded()
    }

    setIsLoading(false)
  }
  return (
    <div className={styles.form}>
      <h1>Upload Image</h1>
      <form className={styles.form} onSubmit={handleFileUploaded}>
        <input
          className={styles.file}
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <input
          className="btn"
          type="submit"
          value={isLoading ? 'Uploading...' : 'Upload'}
        />
      </form>
    </div>
  )
}

export default ImageUpload
