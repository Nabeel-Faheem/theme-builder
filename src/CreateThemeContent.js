
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { generate } from 'shortid';
import _ from 'lodash';
import { useTheme } from './theme/useTheme';

const Container = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 3rem;
`;

const Section = styled.div`
    vertical-align: top;
    margin-right: 10px;
    padding: 10px;
`;

const Row = styled.div`
    padding: 5px;
`;

const Preview = styled.div`
    border: 1px solid #000000;
    border-radius: 4px;
    width: 100%;
    height: 200px;
    padding: 5px;
`;

const CreateThemeContent = props => {
    const { getFonts } = useTheme();
    const [themeName, setThemeName] = useState('');
    const [bgColor, setBgColor] = useState('#Cf4307');
    const [txtColor, setTxtColor] = useState('#FFFFFF');
    const [btnBgColor, setBtnBgColor] = useState('#000000');
    const [btnTxtColor, setBtnTxtColor] = useState('#FFFFFF');
    const [linkColor, setLinkColor] = useState('#10BEEA');
    const [font, setFont] = useState('Roboto');

    const [newTheme, setNewTheme] = useState({});


    const getThemeObj = () => {
        const themeObj = {};
        themeObj[_.camelCase(themeName)] = {
            "id": generate(),
            "name": themeName,
            "colors": {
                "body": bgColor,
                "text": txtColor,
                "button": {
                    "text": btnBgColor,
                    "background": btnTxtColor
                },
                "link": {
                    "text": linkColor,
                    "opacity": 1
                }
            },
            "font": font
        };
        return themeObj;
    }

    useEffect(() => {
        const updated = getThemeObj();
        setNewTheme({...updated});
    }, [bgColor, txtColor, btnBgColor, btnTxtColor, linkColor, font, themeName]);

    const changeName = event => {
        event.preventDefault();
        const name = event.target.value;
        setThemeName(name);
    }

    const changeBgColor = event => {
        event.preventDefault();
        const color = event.target.value;
        setBgColor(color);
    }

    const changeTxtColor = event => {
        event.preventDefault();
        const color = event.target.value;
        setTxtColor(color);
    }

    const changeBtnBgColor = event => {
        event.preventDefault();
        const color = event.target.value;
        setBtnBgColor(color);
    }

    const changeBtnTxtColor = event => {
        event.preventDefault();
        const color = event.target.value;
        setBtnTxtColor(color);
    }

    const changeLinkColor = event => {
        event.preventDefault();
        const color = event.target.value;
        setLinkColor(color);
    }

    const changeFont = event => {
        event.preventDefault();
        const font = event.target.value;
        setFont(font);
    }

    const createTheme = () => {
        props.create(newTheme);
    }
    

    return(
    <>
        <button 
            style={{float:'right'}} 
            onClick={ createTheme }
            disabled={ themeName.trim().length === 0 }>
            Happy? Let's Create
        </button>
        <Container>
            <Section>
                <Row>
                    <label htmlFor="th_name">Theme Name:</label> {' '}
                    <input 
                        type="text" 
                        id="th_name" 
                        name="th_name" 
                        value={ themeName }
                        placeholder="Specify a name" 
                        onChange={(event) => changeName(event)}/>
                </Row>
                <Row>
                    <label htmlFor="bg_color">Background Color:</label> {' '}
                    <input type="color" id="bg_color" name="bg_color" value= { bgColor } onChange={(event) => changeBgColor(event)}/>
                </Row>
                <Row>
                    <label htmlFor="txt_color">Text Color:</label> {' '}
                    <input type="color" id="txt_color" name="txt_color" value={ txtColor } onChange={(event) => changeTxtColor(event)}/>
                </Row>
                <Row>
                    <label htmlFor="btn_bg_color">Button Background Color:</label> {' '}
                    <input type="color" id="btn_bg_color" name="btn_bg_color" value={ btnBgColor } onChange={(event) => changeBtnBgColor(event)}/>
                </Row>
                <Row>
                    <label htmlFor="btn_txt_color">Button Text Color:</label> {' '}
                    <input type="color" id="btn_txt_color" name="btn_txt_color" value={ btnTxtColor } onChange={(event) => changeBtnTxtColor(event)}/>
                </Row>
                <Row>
                    <label htmlFor="link_color">Link Color:</label> {' '}
                    <input type="color" id="link_color" name="link_color" value={ linkColor } onChange={(event) => changeLinkColor(event)}/>
                </Row>
                <Row>
                    <label htmlFor="font">Select a Font:</label> {' '}
                    <select name="font" id="font" onChange={(event) => changeFont(event)} value={font}>
                        {getFonts().map((font, index) =>
                            <option value={ font } key={ index }>{ font }</option>
                        )}
                    </select>
                </Row>
            </Section>

            <Section>
                <span><b>Preview</b></span>
                <Preview style={{backgroundColor: bgColor, color: txtColor, fontFamily: font}}>
                    <p>
                        This is for preview only. Pick the color and font from the 
                        left side to see it working.
                    </p>
                    <button className="btn" style={{backgroundColor:btnBgColor, color:btnTxtColor}}>
                        I am a Button
                    </button> {'  '}
                    <a href="/" style={{color:linkColor}}>I am Link</a>
                </Preview>
            </Section>
        </Container>
    </>
    )
};

export default CreateThemeContent;