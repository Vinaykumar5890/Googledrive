import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {CiSearch} from 'react-icons/ci'
import {MdFormatAlignCenter} from 'react-icons/md'
import {IoIosHelpCircleOutline} from 'react-icons/io'
import {IoMdSettings} from 'react-icons/io'
import {MdOutlineApps} from 'react-icons/md'
import {RxAvatar} from 'react-icons/rx'
import {MdOutlineAddToDrive} from 'react-icons/md'
import {FaComputer} from 'react-icons/fa6'
import {IoIosContacts} from 'react-icons/io'
import {IoMdTime} from 'react-icons/io'
import {FaRegStar} from 'react-icons/fa'
import {FaRegTrashAlt} from 'react-icons/fa'
import {IoIosCloudOutline} from 'react-icons/io'
import {IoMdArrowDropdown} from 'react-icons/io'
import {MdFormatListBulleted} from 'react-icons/md'
import {IoIosInformationCircle} from 'react-icons/io'
import {MdArrowDownward} from 'react-icons/md'
import {FaFile} from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import {storage, db} from '../firebase'
import firebase from 'firebase'

import './index.css' // Assuming you have some CSS to style the components

function Home() {
  const [show, setShow] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  useEffect(() => {
    db.collection('myfiles').onSnapshot(snapshot => {
      setFiles(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      )
    })
  }, [])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = event => {
    if (event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = e => {
    e.preventDefault()
    setUploading(true)
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then(snapshot => {
        storage
          .ref('files')
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            db.collection('myfiles').add({
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fireURL: url,
              size: snapshot._delegate.bytesTransferred,
            })
            setUploading(false)
            setFile(null)
            setShow(false)
          })
      })
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat(bytes / Math.pow(k, i).toFixed(dm) + ' ' + sizes[i])
  }
  return (
    <>
      <div className="drive-container">
        <nav className="navbar">
          <div className="bg-container">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
              className="driveImg"
              alt="driveImg"
            />
            <h1 className="driveHeading">Drive</h1>
          </div>
          <div className="bg-container-search">
            <CiSearch className="CiSearch" />
            <input
              type="search"
              placeholder="Search in Drive"
              className="search"
            />
            <MdFormatAlignCenter className="CiSearch" />
          </div>
          <div className="bg-container">
            <IoIosHelpCircleOutline className="IoMdSettings" />
            <IoMdSettings className="IoMdSettings" />
            <MdOutlineApps className="IoMdSettings" />
            <RxAvatar className="IoMdSettings" />
          </div>
        </nav>
        <div className="bg-container">
          <aside className="drive-sidebar">
            <button className="new-button" onClick={handleShow}>
              <span>+</span> New
            </button>
            <ul>
              <li>
                {' '}
                <MdOutlineAddToDrive className="FaComputer " /> My Drive
              </li>
              <li>
                <FaComputer className="FaComputer" /> Computers
              </li>
              <li>
                <IoIosContacts className="FaComputer" /> Shared 
              </li>
              <li>
                <IoMdTime className="FaComputer" /> Recent
              </li>
              <li>
                {' '}
                <FaRegStar className="FaComputer" />
                Starred
              </li>
              <li>
                {' '}
                <FaRegTrashAlt className="FaComputer" />
                Trash
              </li>
            </ul>
            <hr />
            <div className="storage-info">
              <div className="bg-container">
                <IoIosCloudOutline className="FaComputer" />
                <p>Storage</p>
              </div>
              <div className="storage-bar">
                <div className="storage-used" style={{width: '43%'}}></div>
              </div>
              <p>6.45 GB of 15 GB used</p>
            </div>
          </aside>
          <main className="drive-main">
            <div className="driveContainer">
              <p className="driveHeading">
                My Drive <IoMdArrowDropdown />{' '}
              </p>
              <div className="bg-container">
                <MdFormatListBulleted className="IoMdSettings" />
                <IoIosInformationCircle className="IoMdSettings" />
              </div>
            </div>
            <div className="filesList">
              {files.map(file => {
                return (
                  <div className="file">
                    <FaFile className="FaFile" />
                    <p className="filename">{file.data.filename}</p>{' '}
                  </div>
                )
              })}
            </div>
            <div className="files-header">
              <span className="fileHeadername">
                <b>
                  Name
                  <MdArrowDownward />
                </b>
              </span>
              <span className="fileHeadername">
                <b>Owner</b>
              </span>
              <span className="fileHeadername">
                <b>Last Modified</b>
              </span>
              <span className="fileHeadername">
                <b>File Size</b>
              </span>
            </div>
            <div className="files-list">
              {files.map(file => (
                <div className="file-item">
                  <span className="spanFilename">
                    <FaFile />{' '}
                    <a href={file.data.fireURL} target="_blank">
                      {' '}
                      {file.data.filename}{' '}
                    </a>
                  </span>
                  <span>Me</span>
                  <span>
                    {new Date(
                      file.data.timeStamp?.seconds * 1000,
                    ).toUTCString()}
                  </span>
                  <span>{formatBytes(file.data.size)}</span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <div className="modalPop">
          <form>
            <div className="modalHeading">
              <h3>Select file you want to upload </h3>
            </div>
            <div className="modalBody">
              {uploading ? (
                <button className="postSubmit1" type="button">
                  Uploading...
                </button>
              ) : (
                <>
                  {' '}
                  <div className="fileChoose">
                    <input type="file" onChange={handleChange} />{' '}
                  </div>
                  <input
                    type="submit"
                    className="postSubmit"
                    onClick={handleUpload}
                    type="button"
                  />{' '}
                </>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Home
