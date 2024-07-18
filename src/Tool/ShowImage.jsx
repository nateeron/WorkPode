import React, { useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import {
    DilogAddImage,
    DilogAddImage2,
} from "./Dilog";
import "./stylePhoto.css";
import Random from "../Tool/fn";
// function srcset(image) {
function srcset(image, width, height, cols = 1, rows = 1) {
    return {
        src: `${image}`,
        srcSet: `${image}`,
        // src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
        // srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function ShowImages(item) {
    const itemData = item.item;
    const [pathimage, setpathimage] = useState(item.path ? item.path : "");
    // ------------------------------------
    const dialogContent = document.getElementById("dialog-content");
    const dialogContentZ = document.getElementById("dialog-contentz");
    const dialogContentMove = document.getElementById("dialog-image");
    let scale = 0.9;
    let offsetX, offsetY;
    let MountoffsetX, MountoffsetY;
    function resetsize() {
        offsetY = 0;
        offsetX = 0;
        MountoffsetX = 0;
        MountoffsetY = 0;
        scale = 0.9;

    }

    const openDialog = (src) => {
        // const src = event.target.src;
        resetsize();
        console.log("openDialog(src)");
        dialogContent.style.transform = `scale(0.9)`;

        const img = document.getElementById("dialog-image");
        img.src = src;

        document.querySelector(".dialog-overlay").style.display = "block";
        dialogContentZ.addEventListener("mousewheel", zoom);
        dialogContentMove.addEventListener("mousedown", startDrag);
        dialogContentZ.addEventListener("mousedown", startDrag);
    };

    function closeDialog() {
        document.querySelector(".dialog-overlay").style.display = "none";
        dialogContent.style.top = 0;
        dialogContent.style.left = 0;
        dialogContent.style.transform = "";
    }

    let sizeimgW, sizeimgH;
    const zoom = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            // Scroll down, zoom out
            if (scale > 2) {
                scale = Math.max(0.001, scale - 1);
            } else if (scale > 1) {
                scale = Math.max(0.001, scale - 0.5);
            } else {
                scale = Math.max(0.001, scale - 0.1);
            }
        } else {
            // Scroll up, zoom in
            if (scale > 2) {
                scale = Math.min(20, scale + 1);
            } else if (scale > 1) {
                scale = Math.min(20, scale + 0.5);
            } else {
                scale = Math.min(20, scale + 0.1);
            }
        }

        const setscale = scale.toLocaleString(undefined, { maximumFractionDigits: 1 })
        dialogContent.style.transform = `scale(${setscale})`;
    
        const img = document.getElementById("dialog-image");
        const elementToAnimate = document.getElementById("zoom-show");
    
        // Add the 'show' class to trigger the transition
        elementToAnimate.classList.add("show");
    
        // Remove the 'show' class after 3 seconds
        setTimeout(() => {
            elementToAnimate.classList.remove("show");
        }, 3000); // 3 seconds
    
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const rect = img.getBoundingClientRect(); // Assuming 'element' is the element you want to get the size from
        const percentage = (rect.width / naturalHeight) * 100;
        const cal = ((setscale - 1) * 100) /1
        const cal_ =  cal < 10 && cal > 0 ? 0 : cal > -10 && cal < 0  ? 0 : cal;
        console.log(setscale,parseInt(cal_))
        // (เงินเดือนใหม่ - เงินเดือนเก่า) x 100 ÷ เงินเดือนเก่า = เปอร์เซ็นต์เงินเดือนที่เพิ่มขึ้น
        // document.getElementById('zoom-sizeimage').innerText = percen.toString("#,###") + '%';
        const zoomSizeElement = document.getElementById("zoom-sizeimage");
        // zoomSizeElement.innerText = percentage.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "%";
         zoomSizeElement.innerText = parseInt(cal_).toString()  + "%";
    };

    const startDrag = (event) => {
        MountoffsetX = event.clientX;
        MountoffsetY = event.clientY;
        event.preventDefault();
        const inlineStyle = dialogContent.style.cssText;
        const leftValue = getPropertyValue(inlineStyle, "left");
        const topValue = getPropertyValue(inlineStyle, "top");
        offsetX = leftValue;
        offsetY = topValue;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
    };

    const drag = (event) => {
        event.preventDefault();

        const MoveX = MountoffsetX - event.clientX;
        const Movey = MountoffsetY - event.clientY;
        let x = offsetX - MoveX;
        let y = offsetY - Movey * 2;
        dialogContent.style.left = x + "px";
        dialogContent.style.top = y + "px";
    };
    const getPropertyValue = (style, property) => {
        const regex = new RegExp(property + ":\\s*(-?\\d+\\.?\\d*)px");
        const match = style.match(regex);
        if (match) {
            return parseFloat(match[1]);
        }
        return null;
    };

    const getScaleValue = (style) => {
        const regex = /scale\((\d+(\.\d+)?)\)/;
        const match = style.match(regex);
        if (match) {
            return parseFloat(match[1]);
        }
        return null;
    };
    const endDrag = () => {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
    };
    //-------------------------------------------

    const itemDatas = [
        {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
            author: "@bkristastucchio",
            featured: true,
        },
        {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
            author: "@rollelflex_graphy726",
        },
        {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "Camera",
            author: "@helloimnik",
        },
        {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "Coffee",
            author: "@nolanissac",
        },
        {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "Hats",
            author: "@hjrc33",
        },
        {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
            author: "@arwinneil",
            featured: true,
        },
        {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "Basketball",
            author: "@tjdragotta",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
            author: "@katie_wasserman",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
            author: "@silverdalex",
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "Tomato basil",
            author: "@shelleypauls",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
            author: "@peterlaster",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "Bike",
            author: "@southside_customs",
        },
    ];
    const rm = (e) => {
        const ids = e.target.closest("[ids]").getAttribute("ids");
        item.rm(ids);
    };

    const Multiimg = () => {

        return (
            <ImageList
                sx={{
                    width: "75%",
                    height: "75%",
                    transform: "translateZ(0)",
                }}
                rowHeight={200}
                gap={1}
            >
                    <img
                        src={pathimage + itemData.img}
                        alt={itemData.title}
                        loading="lazy"
                        style={{ objectFit: "cover", width: "100%", flexGrow: "revert-layer" }}
                        className="hover-effect"
                        onClick={() => openDialog(`${pathimage + itemData.img}`)}
                    />
            </ImageList>
        )
    }

    const Oneimg = () => {

        return (
            <Box sx={{width:"75%"}}>
            <img
            src={pathimage + itemData.img}
            alt={itemData.title}
            loading="lazy"
            style={{ objectFit: "cover", width: "100%", flexGrow: "revert-layer" }}
            className="hover-effect"
            onClick={() => openDialog(`${pathimage + itemData.img}`)}
        /></Box>
        )
    }
    if (itemData && itemData.length == 1) {

        return <Oneimg></Oneimg>;
        
    }else{
        return <Multiimg></Multiimg>;

    }

    
}
