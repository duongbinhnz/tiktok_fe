/* eslint-disable react-hooks/exhaustive-deps */
import Tippy from "@tippyjs/react/headless"
import axios from "axios"
import classNames from "classnames/bind"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { DELETE_VIDEO } from "../../../api/api"
import { CheckIcon, CommentIcon, DeleteIcon, DownloadIcon, EditIcon, HeartactiveIcon, HeartIcon, MoreIcon, MusicIcon, PauseIcon, PlayIcon, ReportIcon, ShareIcon, SoundIcon, UnSoundIcon } from "../../../assets/icons/icons"
import Button from "../../../components/Button/Button"
import { Following, handleShowLogin, Hearted } from "../../../components/GlobalFunction/GlobalFunction"
import Tippys from "../../../components/Tippys/Tippys"
import useElementOnScreen from "../../../hooks/useElementOnScreen"
import TippyShare from '../../../layouts/components/TippyShare/TippyShare'
import { filterSlice } from '../../../redux/reducer'
import styles from "./ItemVideo.module.scss"

var numeral = require('numeral')
const cx = classNames.bind(styles)

interface Props {
  data: any,
}

const ItemVideo: React.FC<Props> = ({ data }) => {

  const dispath = useDispatch()
  const sound = useSelector<any>(item => item['filters']['sound'])

  const [play, setPlay] = useState<boolean>(false)
  const [time, setTime] = useState<any>(null)
  const [follow, setFollow] = useState<boolean>(data.following)
  const [heart, setHeart] = useState<boolean>(data.heart_check)

  const ref = useRef<HTMLDivElement>(null)
  const link_btn = useRef<HTMLAnchorElement>(null)
  const btn_content = useRef<HTMLDivElement>(null)
  const ref_item = useRef<HTMLDivElement>(null)
  const ref_img = useRef<HTMLImageElement>(null)
  const ref_avatar = useRef<HTMLImageElement>(null)
  const refSound = useRef<HTMLDivElement>(null)
  const ref_video = useRef<HTMLVideoElement>(null)
  const updateTime = useRef<HTMLDivElement>(null)
  const progres = useRef<HTMLInputElement>(null)
  const progress = useRef<HTMLInputElement>(null)
  const progress__trackupdat = useRef<HTMLDivElement>(null)
  const progress__trackupdate = useRef<HTMLDivElement>(null)


  const isVisibile_video = useElementOnScreen({ threshold: 1 }, ref_video)

  const CurrentUser = localStorage.getItem("user")

  function handleFollow(buff: any) {
    if (CurrentUser) {
      setFollow(!follow)
      Following(data, buff)
    } else {
      handleShowLogin()
    }
  }

  useEffect(() => {
    if (isVisibile_video) {
      if (!play) {
        setPlay(true)
        ref_video.current?.play()
        ref_video.current!.currentTime = 0
      }
    } else {
      if (play) {
        ref_video.current?.pause()
        setPlay(false)
      }
    }
  }, [isVisibile_video])

  useEffect(() => {
    const Click = ref.current!.onclick = function () {
      if (!play) {
        ref_video.current?.play()
        setPlay(false)
      } else {
        ref_video.current?.pause()
        setPlay(true)
      }
    }

    return () => {
      ref.current?.removeEventListener('click', Click)
    }
  }, [play])

  useEffect(() => {
    const timeUpdate = ref_video.current!.ontimeupdate = function () {
      if (ref_video.current?.duration) {
        const progressPercent = Math.floor((ref_video.current?.currentTime / ref_video.current?.duration) * 100)
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        )
        progress__trackupdate.current!.style.width = progressPercent + "%"
      }
    }

    const mouseOver = ref_video.current!.onmouseover = function () {
      if (ref_video.current?.duration) {
        setTime(
          (Math.floor(ref_video.current?.currentTime).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.currentTime) : "00:0" + Math.floor(ref_video.current?.currentTime)) +
          "/" +
          (Math.floor(ref_video.current?.duration).toString().length >= 2 ? "00:" + Math.floor(ref_video.current?.duration) : "00:0" + Math.floor(ref_video.current?.duration))
        )
      }
    }

    const ended = ref_video.current!.onended = function () {
      progress__trackupdate.current!.style.width = 0 + "%"
    }

    return () => {
      ref_video.current?.removeEventListener('timeupdate', timeUpdate)
      ref_video.current?.removeEventListener('mouseover', mouseOver)
      ref_video.current?.removeEventListener('ended', ended)
    }
  }, [time, play])

  useEffect(() => {
    const inPut = progress.current!.oninput = function (e) {
      progress__trackupdate.current!.style.width = (e.target as HTMLInputElement).value + "%"
      const seekTime = (Number((e.target as HTMLInputElement).value) * ref_video.current!.duration) / 100
      ref_video.current!.currentTime = seekTime
    }

    const mouseDown = progress.current!.onmousedown = function () {
      ref_video.current?.pause()
    }

    const mouseUp = progress.current!.onmouseup = function () {
      if (isVisibile_video) {
        ref_video.current?.play()
        setPlay(true)
      }
    }

    return () => {
      progress.current?.removeEventListener('input', inPut)
      progress.current?.removeEventListener('mousedown', mouseDown)
      progress.current?.removeEventListener('mouseup', mouseUp)
    }
  }, [progress__trackupdate.current?.style.width])

  useEffect(() => {
    const inPut = progres.current!.oninput = function (e) {
      progress__trackupdat.current!.style.height = (e.target as HTMLInputElement).value + "%"
      let volume = Number((e.target as HTMLInputElement).value) / 100
      ref_video.current!.volume = volume
      if (volume < 0.01) {
        dispath(filterSlice.actions.setButtonSound(true))
      } else {
        dispath(filterSlice.actions.setButtonSound(false))
      }
    }

    const Click = refSound.current!.onclick = function () {
      dispath(filterSlice.actions.setButtonSound(!sound))
      if (sound) {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = false
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "100%"
        })
      } else {
        document.querySelectorAll(`[class='${ref_video.current?.className}']`).forEach(item => {
          (item as HTMLVideoElement).muted = true
        })
        document.querySelectorAll(`[class='${progress__trackupdat.current?.className}']`).forEach(item => {
          (item as HTMLDivElement).style.height = "0%"
        })
      }
    }

    return () => {
      progres.current?.removeEventListener('input', inPut)
      refSound.current?.removeEventListener('click', Click)
    }
  }, [sound])

  const deleteVideo = () => {
    (ref_item.current as HTMLDivElement).style.maxHeight = '0';
    (ref_item.current as HTMLDivElement).style.opacity = '0';
    (ref_item.current as HTMLDivElement).style.padding = '0';
    (ref_item.current as HTMLDivElement).style.visibility = 'hidden';
    (link_btn.current as HTMLAnchorElement).style.display = 'none';
    (btn_content.current as HTMLDivElement).style.display = 'none'
    axios.post(DELETE_VIDEO, { _id: data._id, asset_id: data.asset_id })
  }

  return (
    <div className={cx("wrapper")} ref={ref_item}>
      <Tippys setFollow={setFollow} data={data}>
        {
          data.live
            ? <Link className={cx("link-btn")} to={`/@${data.username}`} ref={link_btn}>
              <div className={cx("link-btn_div")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" className={cx('live-icon')} viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="25.25" stroke="url(#paint0_linear)" strokeWidth="1.5"></circle>
                  <defs>
                    <linearGradient
                      id="paint0_linear" x1="-22.739" x2="29.261" y1="26" y2="71.479" gradientUnits="userSpaceOnUse"><stop stopColor="#FF1764"></stop><stop offset="1" stopColor="#ED3495"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <span className={cx("link-btn_span1")}>
                  <img loading="lazy" style={{ width: 100 + "%", height: 100 + "%", objectFit: "cover", maxWidth: '100%', display: "block" }} src={data.avatar} alt={'avatar'} ref={ref_avatar} />
                </span>
                <span className={cx('live-stream')}>LIVE</span>
              </div>
            </Link>
            :
            <Link className={cx("link-btn")} to={`/@${data.username}`} ref={link_btn}>
              <div className={cx("link-btn_div1")}>
                <span className={cx("link-btn_span")}>
                  <img loading="lazy" style={{ width: 100 + "%", height: 100 + "%", objectFit: "cover" }} src={data.avatar} alt={'avatar'} ref={ref_avatar} />
                </span>
              </div>
            </Link>
        }
      </Tippys>

      {/* content-title */}
      <div className={cx("div-btn-content")} ref={btn_content}>
        <div className={cx("div-btn_item")}>
          <div className={cx("div-btn_item-div")}>
            <div style={{ display: "block" }}>
              <h3 className={cx("title")}>
                <a href={`/@${data.username}`}>{data.username}</a>
                {data.blue_check ? <CheckIcon marginLeft={4} marginRight={2} /> : null}
              </h3>
              <h4 className={cx("name-title")}>{data.name}</h4>
            </div>
          </div>
          {(() => {
            if (follow && CurrentUser) {
              return (
                <Button following onClick={() => handleFollow(false)}>
                  Following
                </Button>
              )
            }
            else if (data.username === localStorage.getItem("username") && CurrentUser) {
              return (
                <Tippy
                  interactive
                  appendTo={document.body}
                  offset={[100, -30]}
                  zIndex={1}
                  placement='right-end'
                  render={(attrs) => (
                    <div className={cx('content')} tabIndex={-1} {...attrs}>
                      <div className={cx("tippy__wrapper")}>
                        <div className={cx("tippy__wrapper--item")}>
                          <div className={cx("tippy__link")} onClick={() => { deleteVideo() }}>
                            <div>
                              <DeleteIcon />
                            </div>
                            <span className={cx("tippy__link--hover")}>Xóa video</span>
                          </div>
                        </div>
                        <div className={cx("tippy__wrapper--item")}>
                          <div className={cx("tippy__link")} onClick={() => { }}>
                            <div>
                              <EditIcon />
                            </div>
                            <span className={cx("tippy__link--hover")}>Chỉnh sửa video</span>
                          </div>
                        </div>
                        <div className={cx("tippy__wrapper--item")}>
                          <div className={cx("tippy__link")} onClick={() => { }}>
                            <div>
                              <DownloadIcon />
                            </div>
                            <span className={cx("tippy__link--hover")}>Tải video này xuống</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <div className={cx("settings__videos")}>
                    <MoreIcon />
                  </div>
                </Tippy>
              )
            }
            else {
              return (
                <Button follow onClick={() => handleFollow(true)}>
                  Follow
                </Button>
              )
            }
          })()}
          <div style={{ fontSize: 16, lineHeight: 22 + "px", wordBreak: "break-word", width: 510 + "px", }}>
            <span className={cx('font-popers')}>{data.title}</span>
            {data.name_tag
              && data.name_tag.map((item: any) => (
                <a className={cx("tag")} href={`/tag/${item.key}`} target="_blank" rel="noreferrer" key={uuidv4()}>
                  <strong className={cx("tag_strong")}>
                    #{item.key}
                  </strong>
                </a>
              ))}
          </div>
          <h4 className={cx("video-music")}>
            <a className={cx("video-music_a")} href={data.link_music}>
              <MusicIcon marginRight={5} marginTop={2} />
              {data.name_music}
            </a>
          </h4>
        </div>

        {/* xử lý video */}
        <div className={cx("div-btn-video")}>
          <div className={cx("div_first_normal")} style={{ height: data.height }}>
            <img loading="lazy" src={data.link_video.replace("mp4", "jpg")} alt="video" ref={ref_img} />
            <div className={cx("div_first-item")}>
              <div className={cx("div-1")}>
                <div className={cx("div-1_item")}>
                  <video loop muted={true} preload="metadata" className={cx("display")} ref={ref_video} src={data.link_video} />
                </div>
              </div>
              <div className={cx("button-play")} onClick={() => setPlay(!play)} ref={ref}>
                {play ? <PlayIcon /> : <PauseIcon />}
              </div>
              <div className={cx("toast-sound")}>
                <div className={cx("button-sound")} ref={refSound}>
                  <div className={cx("video-sound")}>{sound ? <UnSoundIcon /> : <SoundIcon />}</div>
                </div>
                <div className={cx("edit-sound")}>
                  <input className={cx("progres")} type="range" step="1" min="0" max="100" ref={progres} />
                  <div className={cx("progress__trac")}>
                    <div className={cx("progress__track-updat")} ref={progress__trackupdat}></div>
                  </div>
                </div>
              </div>
              <div className={cx("button-footer")}>
                <div className={cx("process-item")}>
                  <input className={cx("progress")} type="range" step="1" min="0" max="100" ref={progress} />
                  <div className={cx("progress__track")}>
                    <div className={cx("progress__track-update")} ref={progress__trackupdate}></div>
                  </div>
                </div>
                <div className={cx("process-number")} ref={updateTime}>
                  {time}
                </div>
              </div>
              <p className={cx("button-report")}><ReportIcon marginRight="5" />Report</p>
            </div>
          </div>
          <div className={cx("button-reaction")}>
            <button className={cx("button-heart")} onClick={() => { setHeart(!heart); if (!CurrentUser) { handleShowLogin() } else Hearted(data, !heart) }}>
              <span className={cx("title-reaction")}>
                {heart && CurrentUser ? <HeartactiveIcon /> : <HeartIcon />}
              </span>
              <strong className={cx("title-reactjs")}>
                {data.heart.toString().length >= 4 ? numeral(data.heart).format('0.0a').toString().toUpperCase() : data.heart}
              </strong>
            </button>
            <button className={cx("button-heart")} onClick={handleShowLogin}>
              <span className={cx("title-reaction")}>
                <CommentIcon />
              </span>
              <strong className={cx("title-reactjs")}>
                {data.comment.toString().length >= 4 ? numeral(data.comment).format('0.0a').toString().toUpperCase() : data.comment}
              </strong>
            </button>
            <TippyShare>
              <button className={cx("button-heart")} onClick={handleShowLogin}>
                <span className={cx("title-reaction")}>
                  <ShareIcon />
                </span>
                <strong className={cx("title-reactjs")}>
                  {data.share.toString().length >= 4 ? numeral(data.share).format('0.0a').toString().toUpperCase() : data.share}
                </strong>
              </button>
            </TippyShare>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ItemVideo
