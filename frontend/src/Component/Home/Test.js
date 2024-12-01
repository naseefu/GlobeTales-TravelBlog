// import React from 'react';
// import ReactFullpage from '@fullpage/react-fullpage';

// const FullPageExample = () => (
//   <ReactFullpage
//     navigation
//     sectionsColor={['#1BBC9B', '#4BBFC3', '#7BAABE', '#f90']}
//     render={() => (
//       <ReactFullpage.Wrapper>
//         <div className="section">Section 1</div>
//         <div className="section">Section 2</div>
//         <div className="section">Section 3</div>
//         <div className="section">Section 4</div>
//       </ReactFullpage.Wrapper>
//     )}
//   />
// );

// export default FullPageExample;

import React, { useRef } from 'react';
import './test.css'
import {motion,useScroll,useTransform} from 'framer-motion'

const Horizontal=()=>{

  const targetRef = useRef(null)
  const {scrollYProgress} = useScroll({target:targetRef});
  const x = useTransform(scrollYProgress,[0,1],["0%","-45%"]);

  return(
    <div className=''>
      <div className='min-h-screen bg-red-500'>
        hello
      </div>
      <div className='h-[500vh]' ref={targetRef}>
        <div className='hori' style={{position:'sticky',top:'0',overflow:'hidden',justifyContent:'flex-start',alignItems:'center'}}>
          <motion.div className='grid grid-cols-4' style={{gridGap:"30vw",x}}>
          <div className=''>
            <img className='h-screen object-fit min-w-[900px]' style={{objectFit:'cover'}} src='https://images.pexels.com/photos/47214/pexels-photo-47214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='1'/>
          </div>
          <div>
            <img className='h-screen object-fit min-w-[900px]' style={{objectFit:'cover'}} src='https://images.pexels.com/photos/7980885/pexels-photo-7980885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='1'/>
          </div>
          <div>
            <img className='h-screen object-fit min-w-[900px]' style={{objectFit:'cover'}} src='https://images.pexels.com/photos/5381501/pexels-photo-5381501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='1'/>
          </div>
          <div>
            <img className='h-screen object-fit min-w-[900px]' style={{objectFit:'cover'}} src='https://images.pexels.com/photos/6729273/pexels-photo-6729273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='1'/>
          </div>
        </motion.div>
        </div>
      </div>
      <div>
        <div className='min-h-screen bg-gray-500'/>
      </div>
    </div>
  )

}

export default Horizontal