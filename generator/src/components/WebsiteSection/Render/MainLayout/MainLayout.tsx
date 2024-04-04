import React, { ReactElement } from 'react'

type Props = {
    children : string | ReactElement | React.JSX.Element;
}

/*
xl : 1000px
lg : 800px
md : 600px
sm : 500 px
*/

function MainLayout(props: Props) {
  return (
    <section className='flex w-full justify-center min-h-screen'>
        <section className='w-full xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px] sm:max-w-[500px]'>
            {props.children}
        </section>
    </section>
  )
}

export default MainLayout;