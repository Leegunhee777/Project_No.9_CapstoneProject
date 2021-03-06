import React from 'react'
import Subheader from '../Header/Subheader'
import DesignWrite from './DesignWrite'

const menus = [
    {component: "πBEST λμμΈ", path: "/design/best"},
    {component: "β‘μ΅μ μ", path: "/design/recent"},
    {component: "π­λ΄ λμμΈ", path: "/design/mydesign"},
    {component: "πμ’μμ λλ₯Έ λμμΈ", path: "/design/like"},
    {component: "π£νλ‘μ°ν λμμΈ", path: "/design/follow"},
    // {component: "π₯μΈκΈ° νκ·Έ", path: "/design/hashtag"},
];

const DesignSubheader = () => (
    <Subheader menus={menus} additionalButton={<DesignWrite />}/>
)

export default DesignSubheader