import axios from "axios"
import classNames from "classnames/bind"
import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { DISCOVER, FOLLOWING_ACCOUNTS, SUGGEST_ACCOUNTS } from "../../../api/api"
import { MusicIcon, SharpIcon } from "../../../assets/icons/icons"
import Button from "../../../components/Button/Button"
import { handleShowLogin } from "../../../components/GlobalFunction/GlobalFunction"
import { DiscoverLoading } from "../../../components/Loading/Loading"
import DivUser from "./DivLink/DivUser"
import styles from "./Sidebar.module.scss"
import SuggestAcounts from "./SuggestAcounts/SuggestAcounts"

const cx = classNames.bind(styles)

const dieukhoan = [
  { title: 'About', },
  { title: 'Newsroom', },
  { title: 'Contact', },
  { title: 'Careers', },
  { title: 'ByteDance', },
  { title: 'TikTok for Good', },
  { title: 'Advertise', },
  { title: 'Developers', },
  { title: 'Transparency', },
  { title: 'TikTok Rewards', },
  { title: 'Help', },
  { title: 'Safety', },
  { title: 'Terms', },
  { title: 'Privacy', },
  { title: 'Creator Portal', },
  { title: 'Community Guidelines', },
]


const Sidebar: React.FC = () => {
  const [discover, setDiscover] = useState<any>()
  const ref = useRef<HTMLDivElement>(null)
  const currentUser = localStorage.getItem("user")
  const [suggest, setSuggest] = useState<any>(null)
  const [following, setFollowing] = useState<any>(null)

  useEffect(() => {
    localStorage.setItem("ref", ref.current?.className || '')
  }, [ref])

  useEffect(() => {
    axios.get(DISCOVER).then((res) => setDiscover(res)).catch((res) => console.log(res))
    axios.get(SUGGEST_ACCOUNTS).then((req) => setSuggest(req)).catch((res) => console.log(res))
    axios.get(FOLLOWING_ACCOUNTS).then((req) => setFollowing(req)).catch((res) => console.log(res))
  }, [])

  return (
    <div className={cx("wrapper")} ref={ref}>
      <div className={cx("container")}>
        <DivUser />
        {(() => {
          if (!currentUser) {
            return (
              <div className={cx("containers")}>
                <p style={{ fontSize: 16 + "px", lineHeight: 22 + "px", color: "rgba(22, 24, 35, 0.5" }}>
                  Log in to follow creators, like videos, and view comments.</p>
                <Button login onClick={handleShowLogin}>
                  Log in
                </Button>
                <SuggestAcounts title="Suggested accounts" atb="See all" data={suggest} />
              </div>
            )
          } else {
            return (
              <>
                <SuggestAcounts title="Suggested accounts" atb="See all" data={suggest} />
                <SuggestAcounts title="Following accounts" atb="See more" data={following} />
              </>
            )
          }
        })()}

        <div className={cx("wrapper-1")}>
          <p className={cx("title")}>Discover</p>
          <div className={cx("container-1")}>
            {discover
              ? discover.data[0].data.map((item: any) => (
                (() => {
                  switch (item.icon) {
                    case "MusicIcon":
                      return (
                        <Link key={uuidv4()} className={cx("link")} to={`/music/${item.content.replace('-', '').replace(/ /g, "_")}`}>
                          <div className={cx("content")}>
                            <p className={cx("icon-btn")}>
                              <MusicIcon />
                            </p>
                            <p className={cx("title-btn")}>{item.content}</p>
                          </div>
                        </Link>
                      )
                    case "SharpIcon":
                      return (
                        <Link key={uuidv4()} className={cx("link")} to={`/tag/${item.content}`}>
                          <div className={cx("content")}>
                            <p className={cx("icon-btn")}>
                              <SharpIcon />
                            </p>
                            <p className={cx("title-btn")}>{item.content}</p>
                          </div>
                        </Link>
                      )
                  }
                })()
              ))
              : <DiscoverLoading />}
          </div>
        </div>
        <div className={cx("sperate")}></div>
        <div className={cx('footer')}>
          <div className={cx('footer-item')}>
            {dieukhoan.map((props) => (
              <Link key={uuidv4()} className={cx('link-footer')} to={`/@${props.title.toLowerCase().replace('-', '').replace(/ /g, "_")}`}>{props.title}</Link>
            ))}
          </div>
          <span className={cx('span-title')}>© 2022 TikTok</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
