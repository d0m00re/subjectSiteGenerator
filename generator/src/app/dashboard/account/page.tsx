import useMe from '@/store/me.zustand.store'
import Image from 'next/image';
import React, {useEffect} from 'react'

type Props = {}

function page({}: Props) {
    const me = useMe();

    useEffect(() => {
      me.populate();    
    }, [])

    return (
    <section>
        <p>profil image</p>
        <p>email {me.userData.email}</p>
        <p>name {me.userData.name}</p>
    </section>
  )
}

export default page