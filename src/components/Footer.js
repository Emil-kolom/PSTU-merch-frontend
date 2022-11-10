import React from 'react';
import '../styles/container.css'
import '../styles/footer.css'
import {Telegram} from "@mui/icons-material";

const Footer = () => {
    return (
        <footer >
            <div className={'footer-wrap container'}>
                <div className={'footer-item'}>
                    <h3>Неофіційний сайт продажу мерчу ПДТУ</h3>
                </div>
                <div className={'footer-item'}>
                    <p>У випадку питань зветрайтеся на пошту ruislan.kolomoychenko@gmail.com або <a href="mailto: ruislan.kolomoychenko@gmail.com"><span
                        className={'email'}>натисніть сюди</span></a></p>
                </div>
                <div className={'footer-item'}>
                    Зв'язатися з нами:
                    <div className={'contact'}>
                        <div className={'contact-item'}>
                            <Telegram></Telegram>
                            <a href="https://t.me/mar_pdtu">PSTU</a>
                        </div>
                        <div className={'contact-item'}>
                            <Telegram></Telegram>
                            <a
                                href="https://t.me/mar_pdtu">Me</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;