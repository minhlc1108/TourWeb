import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  message,
  theme,
  Tooltip,
} from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from "react-transition-group"
// import { useMediaQuery } from "react-responsive"
import SideNav from "./SideNav.jsx"
import HeaderNav from "./HeaderNav.jsx"
// import { NProgress } from "../../components"
// import { PATH_LANDING } from "../../constants"
// import { useSelector, useDispatch } from "react-redux"
// import { toggleTheme } from "../../redux/theme/themeSlice.ts"
const { Content } = Layout

export const AppLayout = ({ children }) => {
  const {
    token: { borderRadius }
  } = theme.useToken()
  // const isMobile = useMediaQuery({ maxWidth: 769 })
  const [collapsed, setCollapsed] = useState(true)
  const [navFill, setNavFill] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const nodeRef = useRef(null)
  const floatBtnRef = useRef(null)
  // const dispatch = useDispatch()
  // const { mytheme } = useSelector(state => state.theme)
  const items = [
    // {
    //   key: "user-profile-link",
    //   label: "profile",
    //   icon: <UserOutlined />
    // },
    // {
    //   key: "user-settings-link",
    //   label: "settings",
    //   icon: <SettingOutlined />
    // },
    // {
    //   key: "user-help-link",
    //   label: "help center",
    //   icon: <QuestionOutlined />
    // },
    // {
    //   type: "divider"
    // },
    {
      key: "user-logout-link",
      label: "Thoát khỏi trang quản trị",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        navigate("/")
        // setTimeout(() => {
        //   navigate(PATH_LANDING.root)
        // }, 1000)
      }
    }
  ]
  // useEffect(() => {
  //   setCollapsed(isMobile)
  // }, [isMobile])

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true)
      } else {
        setNavFill(false)
      }
    })
  }, [])

  return (
    <>
      {/* <NProgress isAnimating={isLoading} key={location.key} /> */}
      <Layout
        style={{
          minHeight: "100vh"
          // backgroundColor: 'white',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={value => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "none",
            border: "none",
            transition: "all .2s"
          }}
        />
        <Layout
          style={
            {
              // background: 'none',
            }
          }
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : "200px",
              padding: "0 2rem 0 0",
              background: navFill ? "rgba(255, 255, 255, .5)" : "none",
              backdropFilter: navFill ? "blur(8px)" : "none",
              boxShadow: navFill ? "0 0 8px 2px rgba(0, 0, 0, 0.05)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: "all .25s"
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64
                  }}
                />
              </Tooltip>
            </Flex>
            <Flex align="center" gap="small">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Flex>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8bD-grmaY0Y6_j5Adu1Bc6nY6OMyeF4QMw&s"
                    alt="user profile photo"
                    height={36}
                    width={36}
                    style={{ borderRadius, objectFit: "cover" }}
                  />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : "200px"}`,
              // background: '#ebedf0',
              borderRadius: collapsed ? 0 : borderRadius,
              transition: "all .25s",
              padding: "24px 32px",
              minHeight: 360
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true)
                  }}
                  onEntered={() => {
                    setIsLoading(false)
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
