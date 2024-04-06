import React, { ReactElement } from 'react'

type Props = {
    children : string | ReactElement | React.JSX.Element;
    style : any;
  }

/*
xl : 1000px
lg : 800px
md : 600px
sm : 500 px
*/
// todo : remove style later and pass real props
function MainLayout(props: Props) {
  return (
    <section
      style={props.style}
      className='flex w-full justify-center'>
        <section className='flex flex-col gap-2 w-full xl:max-w-[1000px] lg:max-w-[800px] md:max-w-[600px] sm:max-w-[500px]'>
            {props.children}
        </section>
    </section>
  )
}

export default MainLayout;