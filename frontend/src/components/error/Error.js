import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CLEAR_ERROR, selectError } from '../../redux/slices/ErrorSlice.js'

const Error = () => {
  const errorMessage = useSelector(selectError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage)
      dispatch(CLEAR_ERROR())
    }
  }, [errorMessage, dispatch])

  return <ToastContainer position="top-right" autoClose={2000} />
}

export default Error
