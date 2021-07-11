import React from 'react'
import '../scss/components/banner.scss'
function Banner({title}) {
    return (
        <div className="banner">
            <div className="container flex-centering">
                <div className="banner__img"><img src="https://theme.zdassets.com/theme_assets/43400/8bb2a16f10c36a5d9f2f936784f0a66489f58870.png" alt="lol-logo"/></div>
                <h2 className="banner__title">{title}</h2>
            </div>
        </div>
    )
}

export default Banner
