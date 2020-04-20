import { useEffect, useState } from 'react';

export default (threshold = 0.25) => {
  const [target, setTarget] = useState(null);
  const [observed, setObserved] = useState(false);
  const [restart, setRestart] = useState(false);

  const handleRestart = () => {
    if(window.scrollY === 0){
      setRestart(true);
    } else {
      setRestart(false);
    }
  }

  useEffect(()=> {
    window.addEventListener('scroll', handleRestart);
    return ()=> window.removeEventListener('scroll', handleRestart);
  },[target]);

  useEffect(()=>{
    const options = {
      marginRoot: '0px',
      threshold
    }
    const observer = new IntersectionObserver((entry, observer)=>{
      if(restart){
        setObserved(false);
      }

      if(entry[0].isIntersecting){
        setObserved(true);
      } /*else{
        setObserved(false);
      }*/
    }, options)
    if(target) observer.observe(target);
    return ()=> {
      if(target) observer.unobserve(target)
    };
  },[target, restart]);

  return [observed, setTarget];
}
