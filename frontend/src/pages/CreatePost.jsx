import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [formData, setFormData] = useState({ image: null, caption: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!formData.image || !formData.caption.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)

    const data = new FormData()
    data.append('image', formData.image)
    data.append('caption', formData.caption)

    try {
      await axios.post('http://localhost:3000/api/create-post', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage({ type: 'success', text: 'Post created successfully!' })
      setFormData({ image: null, caption: '' })
      document.querySelector('input[type="file"]').value = ''
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to create post' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-post'>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image" style={{ color: '#aaa', fontSize: '14px' }}>
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          required
        />

        <label htmlFor="caption" style={{ color: '#aaa', fontSize: '14px' }}>
          Caption
        </label>
        <input
          type="text"
          id="caption"
          name="caption"
          placeholder='Enter post caption'
          value={formData.caption}
          onChange={handleInputChange}
          maxLength={200}
          required
        />

        <button type='submit' disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>

        {message.text && (
          <div
            style={{
              padding: '10px',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '14px',
              backgroundColor: message.type === 'success' ? '#22c55e33' : '#ef443333',
              color: message.type === 'success' ? '#86efac' : '#fca5a5',
              border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4433'}`
            }}
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  )
}

export default CreatePost
