import { useEffect, useRef, useState } from "react"
import TopNav from './TopNav'
import Home from '~/pages/Client/Home'
import FooterClient from './FooterClient'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
    CSSTransition,
    SwitchTransition,
    TransitionGroup
  } from "react-transition-group"

const { Header, Content, Footer } = Layout;

const LayoutClient = ( {children} ) => {
    const nodeRef = useRef(null)


  return (
    <Layout style={{
        minHeight: '100vh',
        display: ' flex',
        flexDirection: 'column'
    }}>

      <Header style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:'white'
      }}>
        <TopNav
        style ={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'Center'
        }}
        />

        </Header>
      <Content style={{
        padding: '0 48px',

      }}>
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

        </Content>
      <Footer style={{
        textAlign: 'center',
      }}>

      <FooterClient/>

        </Footer>

    </Layout>
  )
}

export default LayoutClient
