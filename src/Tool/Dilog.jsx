import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CodeEditor from "@uiw/react-textarea-code-editor";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";
import { isJSON } from "../../../FN/function";
import {
    API_URLS,
    FetchAPIdynamic,
    GetMenuMain,
    f_GetSubject,
    f_AddData,
    f_UploadImage,
    GetSubjectDetail,
} from "../GetAPI/apiUrls";
// import { Typography } from "@mui/material";
import ShowImages from "./ShowImage";
export const DilogAddText = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };
    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Add Text</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            id="outlined-multiline-static"
                            sx={{ width: "100%" }}
                            multiline
                            rows={8}
                            //   defaultValue="Default Value"
                            onChange={oj.onChange}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const DilogAddHead = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };
    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Add Head</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <TextField id="outlined-multiline-static" sx={{ width: "100%" }} onChange={oj.onChange} />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

{
    /* Dilog image */
}
export const DilogAddImage = (d) => {
    // const oj = {
    //     open: d ? d.opens : false,
    //     onClose: d ? d.onclose : false ,
    //     onChange:d ? d.onchange: false,
    //     handledrop:d? d.drop : null,
    //     demo: d? d.demouploads : [],
    // };
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
        handledrop: d.drop,
        demo: d.demouploads,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    const [file, setFile] = useState(null);

    // const [demoUploads, setDemoUploads] = useState([]);

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const droppedFiles = Array.from(e.dataTransfer.files);
    //     const newImages = [];

    //     droppedFiles.forEach((file) => {
    //         console.log("file : ",file);

    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             newImages.push(reader.result);
    //             if (newImages.length === droppedFiles.length) {
    //                 setDemoUploads([...demoUploads, ...newImages]);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     });
    //     console.log(demoUploads);
    // };

    const handleUpload = async () => {
        const formData = new FormData();
        let detailItem = [];

        demoUploads.forEach((image, index) => {
            formData.append(`image_${index}`, image);
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, "0");
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
            const year = currentDate.getFullYear();
            const hours = currentDate.getHours().toString().padStart(2, "0");
            const minutes = currentDate.getMinutes().toString().padStart(2, "0");
            const seconds = currentDate.getSeconds().toString().padStart(2, "0");
            const formattedDateTimeStr = `${year}-${month}-${day}_${hours}.${minutes}.${seconds}`;
            const mdelimage = {
                img:
                    "[Path.GetExtension]" +
                    formattedDateTimeStr +
                    "_" +
                    selectDiaogAddData.subjectId +
                    "_" +
                    selectDiaogAddData.subjectDetailid,
                title: "",
                author: "",
                featured: true,
            };
            detailItem.push(mdelimage);
        });

        try {
            const url = API_URLS.API_upload;
            const tokenHead = API_URLS.API_GetMainSubject_token;
            // Add info to send Post
            selectDiaogAddData.detailItem = detailItem;
            selectDiaogAddData.file = formData;
            // selectDiaogAddData.file = file;
            console.log(detailItem);
            // await f_UploadImage(selectDiaogAddData, url, tokenHead);
            setdilogImage(false);
            data.setRefresh(selectDiaogAddData);
            setselectDiaogAddData({});

            //console.log("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            // alert("Error uploading file:", error)
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = () => {
        // Handle file upload logic here
        console.log("Uploading file:", file);
        // You can upload the file to a server using fetch or XMLHttpRequest
    };
    const dialogContent = document.getElementById("dialog-content");

    function closeDialog() {
        document.querySelector(".dialog-overlay").style.display = "none";
        dialogContent.style.top = 0;
        dialogContent.style.left = 0;
        dialogContent.style.transform = "";
    }

    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <input
                            type="file"
                            onChange={d.onchange}
                            style={{ padding: "5px", "#fileUploadButton": { background: "#123456" } }}
                        />
                    </Box>

                    <Box
                        className="drag-drop-container"
                        onDrop={oj.handledrop}
                        onDragOver={(e) => e.preventDefault()}
                        sx={{
                            background: "#9EA7B131",
                            height: "100px",
                            padding: "20px",
                            margin: "20px",
                            border: "2px dotted #C5CACF5D",
                            borderRadius: "15px",
                        }}
                    >
                        {file ? (
                            <Box>
                                <Typography>File selected: {file.name}</Typography>
                                <Button onClick={handleFileUpload}>Upload</Button>
                            </Box>
                        ) : (
                            <Typography>Drop your image file here</Typography>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Box sx={{}}>
                            {oj &&
                                oj.demo.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        style={{
                                            width: "250px",
                                            padding: "5px",
                                            border: "1px",
                                            boxShadow: "1px 1px 6px #fefefe6e",
                                            borderRadius: "10px",
                                        }}
                                        alt={`Uploaded ${index}`}
                                    />
                                ))}
                            <ShowImages />
                            {/* {demoUploads && <img src={demoUploads} style={{ width: "50%" }} alt="Uploaded" />} */}
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
           
        </>
    );
};

export const DilogAddImage2 = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
        handledrop: d.drop,
        demo: d.demouploads,
    };

    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        // d.fn_setdilogText(false);
        d.onclose(false);
        setDemoUploads([]);
        setdetailItem([]);
    };

    const [file, setFile] = useState(null);

    const [demoUploads, setDemoUploads] = useState([]);
    const [detailItem, setdetailItem] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (file != null && file.length > 0) {
            console.log(file.length)
        setFile([...file ,...droppedFiles]);
            
        }else{
        setFile(droppedFiles);

        }
       
        console.log(file)
        const newImages = [];
        const newitem = [];
        const formData = new FormData();
        let lenImage = detailItem.length;
        // console.log(droppedFiles.length);
        console.log(detailItem.length);
        droppedFiles.forEach((file_, index) => {
            formData.append(`image_${index}`, file_);

            const reader = new FileReader();
            reader.onload = () => {
                // console.log("**********************************************************")
                // console.log(reader)
                // console.log(reader.result)
                newImages.push(reader.result);
                // console.log(newImages)
                // console.log(newImages.length)
                // console.log("**********************************************************")

                let setfromimage = false;
                switch (lenImage + 1) {
                    case 1:
                        setfromimage = true;
                        break;
                    case 2:
                        try {
                            detailItem[0].featured = false;
                        } catch {
                            newitem[0].featured = false;
                        }

                        setfromimage = false;
                        break;
                    case 3:
                        try {
                            detailItem[0].featured = true;
                        } catch {
                            newitem[0].featured = true;
                        }
                        setfromimage = false;
                        break;
                    case 4:
                        try {
                            detailItem[0].featured = false;
                        } catch {
                            newitem[0].featured = false;
                        }
                        setfromimage = false;
                        break;
                    case 5:
                        try {
                            detailItem[0].featured = true;
                        } catch {
                            newitem[0].featured = true;
                        }
                        setfromimage = false;
                        break;
                    case 6:
                        try {
                            detailItem[0].featured = true;
                            detailItem[3].featured = true;
                        } catch {
                            newitem[0].featured = true;
                            newitem[3].featured = true;
                        }
                        setfromimage = false;
                        break;
                    case 7:
                        
                        setfromimage = true;
                        break;
                    case 8:
                        setfromimage = false;
                        break;
                    default:
                        setfromimage = false;
                        break;
                }

                const mdelimage = {
                    index: lenImage,
                    name: file_.name,
                    img: reader.result,
                    title: "demo1",
                    author: "@demo",
                    featured: setfromimage, //detailItem.length <1 ?  true : false,
                };
                lenImage += 1;
                console.log(file_.name, newImages.length, droppedFiles.length);
                newitem.push(mdelimage);
                if (newImages.length === droppedFiles.length) {
                    setDemoUploads([...demoUploads, ...newImages]);
                    setdetailItem([...detailItem, ...newitem]);

                    // set to show
                }

                // detailItem.push(...detailItem,mdelimage);
            };

            reader.readAsDataURL(file_);
        });

        // setdetailItem(detailItem)

        // to upload file
    };

    const [selectDiaogAddData, setselectDiaogAddData] = useState();
    const handleUpload = async () => {
        if (file.length == 0) {
            return ""
        }
        const formData = new FormData();
        let NewdetailItem = [];

        detailItem.forEach((image, index) => {
            console.log(image)
            // formData.append(`image_${index}`, image.img);
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, "0");
            const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
            const year = currentDate.getFullYear();
            const hours = currentDate.getHours().toString().padStart(2, "0");
            const minutes = currentDate.getMinutes().toString().padStart(2, "0");
            const seconds = currentDate.getSeconds().toString().padStart(2, "0");
            const formattedDateTimeStr = `${year}-${month}-${day}_${hours}.${minutes}.${seconds}_${index}`;
            const mdelimage = {
                index: image.index,
                img:formattedDateTimeStr +
                    "_" +
                    d.selectadddata.subjectId +
                    "_" +
                    d.selectadddata.subjectDetailid,
                title: image.title,
                author: image.author,
                featured: image.featured,
            };
            NewdetailItem.push(mdelimage);
        });

        try {
            const url = API_URLS.API_upload;
            const tokenHead = API_URLS.API_GetMainSubject_token;
            // Add info to send Post
            const convert = JSON.stringify(NewdetailItem);
            d.selectadddata.detailItem = convert;
            d.selectadddata.file = file;
            // selectDiaogAddData.file = file;
            console.log("############### [detailItem] ###################");
            console.log(file.length);
            console.log(d.selectadddata);
            console.log(NewdetailItem);
            console.log("convert", convert);
            const jsonObject = JSON.parse(convert);

            console.log("jsonObject", jsonObject);
            //-------------------------------------------------------------------------
            const formDataToSend = new FormData();
            formDataToSend.append("typeId", d.selectadddata.typeId);
            formDataToSend.append("detailItem", d.selectadddata.detailItem);
            formDataToSend.append("Priority", d.selectadddata.Priority);
            formDataToSend.append("subjectId", d.selectadddata.subjectId);
            formDataToSend.append("subjectDetailid", d.selectadddata.subjectDetailid);
            // formDataToSend.append('files', file)
            //Append files to formDataToSend
            if (file) {
                for (let i = 0; i < file.length; i++) {
                    formDataToSend.append("files", file[i]);
                }
            }
            //-------------------------------------------------------------------------
            // console.log('d.selectadddata.typeId',d.selectadddata.typeId);
            // console.log(' d.selectadddata.detailItem', d.selectadddata.detailItem);
            console.log("-------------------------------------------------------------------------");
            console.log("typeId:", formDataToSend.get("typeId"));
            console.log("detailItem:",typeof formDataToSend.get("detailItem"));
            console.log("detailItem:", formDataToSend.get("detailItem"));
            console.log("Priority:", formDataToSend.get("Priority"));
            console.log("subjectId:", formDataToSend.get("subjectId"));
            console.log("subjectDetailid:", formDataToSend.get("subjectDetailid"));
            //console.log('files:', formDataToSend.get('files'));
            console.log("-------------------------------------------------------------------------");

            const resp = await f_UploadImage(formDataToSend, url, tokenHead);
            //setdilogImage(false);
            d.onclose(false)
           // data.setRefresh(d.selectadddata);
            setDemoUploads([]);
            setdetailItem([]);
            d.refresh()
            // Clear Data
         
            setFile([])
            //console.log("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            // alert("Error uploading file:", error)
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileUpload = () => {
        // Handle file upload logic here
        console.log("Uploading file:", file);
        // You can upload the file to a server using fetch or XMLHttpRequest
    };
    const dialogContent = document.getElementById("dialog-content");

    function closeDialog() {
        document.querySelector(".dialog-overlay").style.display = "none";
        dialogContent.style.top = 0;
        dialogContent.style.left = 0;
        dialogContent.style.transform = "";
    }

    const EdtiRemoveImage = (ind) => {
        console.log("-----EdtiRemoveImage-----");
        console.log(ind);
        console.log("befor", detailItem.length);

        const newitem = [];
        // const indexToRemove = detailItem.findIndex(item => item.index === ind); Error
        const newitemWithoutRemoved = detailItem.filter((item) => item.index != ind);
        const test = detailItem[ind].name;
        console.log(test)
        console.log(file)
        setFile([])
        // const fileim = file.filter((item) => console.log(item.name,test) );
        const fileim = file.filter((item,index) => index != ind);
        setFile(fileim)
        console.log(fileim)
        console.log("affter", fileim);
        let lenImage = 0;
        //setdetailItem(newitemWithoutRemoved)
        if (newitemWithoutRemoved.length > 0) {
            newitemWithoutRemoved.forEach((itemIm, indexIm) => {
                let setfromimage = false;
              
                switch (indexIm + 1) {
                    case 1:
                        setfromimage = true;
                        break;
                    case 2:
                        newitem[0].featured = false;
                        setfromimage = false;
                        break;
                    case 3:
                        newitem[0].featured = true;
                        setfromimage = false;
                        break;
                    case 4:
                        newitem[0].featured = false;
                        setfromimage = false;
                        break;
                    case 5:
                        newitem[0].featured = true;
                        setfromimage = false;
                        break;
                    case 6:
                        newitem[0].featured = true;
                        newitem[3].featured = true;
                        setfromimage = false;
                        break;
                    case 7:
                        newitem[0].featured = true;
                        newitem[3].featured = true;
                        setfromimage = false;
                        break;
                    case 8:
                        setfromimage = false;
                        break;
                    default:
                        setfromimage = false;
                        break;
                }

                const mdelimage = {
                    index: lenImage,
                    name: itemIm.name,
                    img: itemIm.img,
                    title: "demo1",
                    author: "@demo",
                    featured: setfromimage, //detailItem.length <1 ?  true : false,
                };
                lenImage += 1;
                newitem.push(mdelimage);
                if (indexIm + 1 === newitemWithoutRemoved.length) {
                    setDemoUploads(newitem);
                    setdetailItem(newitem);
                }
            });
        } else {
            setdetailItem(newitemWithoutRemoved);
        }
    };
    return (
        <>
            <Dialog
                open={d.opens}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={d.onclose}
                background={"none"}
            >
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                    <Box
                        className="drag-drop-container"
                        sx={{
                            background: "#9EA7B131",
                            height: "auto",
                            padding: "20px",
                            margin: "20px",
                            border: "2px dotted #C5CACF5D",
                            borderRadius: "15px",
                        }}
                    >
                        <Box sx={{ display: "ruby-text" }}>
                            {detailItem &&
                                detailItem.map((item, index) => {
                                    return (
                                        <Typography
                                            key={"kim" + index}
                                            sx={{
                                                background: "#77797A71",
                                                borderRadius: "10px",
                                                padding: "5px",
                                                margin: "5px",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {" "}
                                            {item.name}
                                        </Typography>
                                    );
                                })}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {/* // Show image */}
                        {/* {demoUploads &&
                                demoUploads.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        style={{
                                            width: "250px",
                                            padding: "5px",
                                            border: "1px",
                                            boxShadow: "1px 1px 6px #fefefe6e",
                                            borderRadius: "10px",
                                        }}
                                        alt={`Uploaded ${index}`}
                                    />
                                ))} */}
                                {/* {detailItem} */}
                        <ShowImages item={detailItem} rm={EdtiRemoveImage} />
                        {/* {demoUploads && <img src={demoUploads} style={{ width: "50%" }} alt="Uploaded" />} */}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={handleUpload}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Box className="dialog-overlay" id="dialog-contentz" zIndex={99}> Line : 744
                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button
                        sx={{ background: "#16D63086", color: "#FFFFFF" }}
                        className="close-button"
                        onClick={closeDialog}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                </Box>
                <Box className="dialog-content" id="dialog-content" sx={{ display: "flex",justifyContent: "center", alignItems: "center",width: "100%"}}>
                    <img className="dialog-image" id="dialog-image" src="" alt="Zoomed Image"  sx={{height:"100%"}}/>
                </Box>
                <Box className="percen" id="zoom-show">
                    <span id="zoom-sizeimage">100%</span>
                </Box>
                <Box className="sizeimage">
                    <span id="sizeimage"></span>
                </Box>
                <Box />
            </Box>{" "}
        </>
    );
};

{
    /* Dilog Code */
}
export const DilogAddCode = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const selTyp = {
        tc: d.codeedit_textcheng,
        tt: d.codeedit_type,
        tcode: d.codeedit_code,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    const Typecodechang = (e) => {
        d.onchange(e);
    };

    const codechang = (e) => {
        d.codeedit_textcheng(e);
    };

    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Add Code</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selTyp.tt}
                            label="Age"
                            onChange={Typecodechang}
                        >
                            <MenuItem value="c">Language: c</MenuItem>
                            <MenuItem value="vb">Language: vb</MenuItem>
                            <MenuItem value="python">Language: python</MenuItem>
                            <MenuItem value="css">Language: css</MenuItem>
                            <MenuItem value="html">Language: html</MenuItem>
                            <MenuItem value="json">Language: json</MenuItem>
                            <MenuItem value="java">Language: java</MenuItem>
                            <MenuItem value="javascript">Language: javascript</MenuItem>
                            <MenuItem value="jsx">Language: jsx</MenuItem>
                            <MenuItem value="scss">Language: scss</MenuItem>
                            <MenuItem value="ini">Language: ini</MenuItem>
                            <MenuItem value="sql">Language: sql</MenuItem>
                            <MenuItem value="mysql">Language: mysql</MenuItem>
                            <MenuItem value="vbscript">Language: vbscript</MenuItem>
                            <MenuItem value="verilog">Language: verilog</MenuItem>

                            <MenuItem value="bat">Language: bat</MenuItem>
                            <MenuItem value="coffeescript">Language: coffeescript</MenuItem>
                            <MenuItem value="csharp">Language: csharp</MenuItem>
                            <MenuItem value="dart">Language: dart</MenuItem>
                            <MenuItem value="dockerfile">Language: dockerfile</MenuItem>
                            <MenuItem value="flow9">Language: flow9</MenuItem>
                            <MenuItem value="go">Language: go</MenuItem>
                            <MenuItem value="graphql">Language: graphql</MenuItem>
                            <MenuItem value="handlebars">Language: handlebars</MenuItem>

                            <MenuItem value="julia">Language: julia</MenuItem>
                            <MenuItem value="kotlin">Language: kotlin</MenuItem>
                            <MenuItem value="nginx">Language: nginx</MenuItem>
                            <MenuItem value="objective-c">Language: objective-c</MenuItem>
                            <MenuItem value="pgsql">Language: pgsql</MenuItem>
                            <MenuItem value="php">Language: php</MenuItem>
                            <MenuItem value="plaintext">Language: plaintext</MenuItem>
                            <MenuItem value="powerquery">Language: powerquery</MenuItem>
                            <MenuItem value="powershell">Language: powershell</MenuItem>
                            <MenuItem value="shell">Language: shell</MenuItem>
                            <MenuItem value="sparql">Language: sparql</MenuItem>

                            <MenuItem value="vue">Language: vue</MenuItem>
                            <MenuItem value="xml">Language: xml</MenuItem>
                        </Select>
                        <CodeEdit textcheng={codechang} type={selTyp.tt} code={selTyp.tcode} />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const CodeEdit = ({ textcheng, type, code }) => {
    let dataItem = code.detailItem;
    let typeCodes = type;
    const [types, settype] = useState(type);
    if (isJSON(dataItem)) {
        const OJ = JSON.parse(dataItem);
        dataItem = OJ.code;
        typeCodes = OJ.type;
    }

    useEffect(() => {
        settype(type);
    }, [type]);

    const handleChange = (e) => {
        textcheng(e);
    };
    return (
        <>
            <CodeEditor
                value={dataItem}
                data-color-mode="dark"
                language={type}
                placeholder="Please enter code."
                onChange={handleChange}
                padding={15}
                rehypePlugins={[
                    [rehypePrism, { ignoreMissing: false }],
                    [
                        rehypeRewrite,
                        {
                            rewrite: (node, index, parent) => {
                                if (node.properties?.className?.includes("code-line")) {
                                    if (index === 0 && node.properties?.className) {
                                        node.properties.className.push("demo01");
                                    }
                                }
                                if (node.type === "text" && node.value === "return" && parent.children.length === 1) {
                                    parent.properties.className.push("demo123");
                                }
                            },
                        },
                    ],
                ]}
                style={{
                    fontSize: 14,

                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
            />
        </>
    );
};

//************************************************************************************* */
// Dilog Edit
//************************************************************************************** */

/* Dilog Edit TEXT */
export const DilogEditText = (d) => {
    //console.log(d)
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
        val: d.val,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        d.onchange(e);
    };
    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Edit Text</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            id="outlined-multiline-static"
                            sx={{ width: "100%" }}
                            multiline
                            rows={8}
                            value={d.val}
                            //   defaultValue="Default Value"
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#DB8420" }} onClick={BT_oj.onClick}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export const DilogEditHead = (d) => {
    //console.log(d)
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
        val: d.val,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        d.onchange(e);
    };

    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Edit Head</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            id="outlined-multiline-static"
                            sx={{ width: "100%" }}
                            value={d.val}
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#DB8420" }} onClick={BT_oj.onClick}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

/* Dilog Edit Image */
export const DilogEditImage = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
        onChange: d.onchange,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <input
                            type="file"
                            onChange={d.onchange}
                            style={{ padding: "5px", "#file-upload-button": { background: "#123456" } }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

/* Dilog Edit Code */
export const DilogEditCode = (d) => {
    const oj = {
        open: d.opens,
        onClose: d.onclose,
    };
    const BT_oj = {
        onClick: d.bt_onclick,
    };
    const selTyp = {
        tc: d.codeedit_textcheng,
        tt: d.codeedit_type,
        tcode: d.codeedit_code,
    };
    const bt_Cancel = () => {
        d.fn_setdilogText(false);
    };

    const Typecodechang = (e) => {
        d.onchange(e);
    };

    const codechang = (e) => {
        d.codeedit_textcheng(e);
    };

    return (
        <>
            <Dialog
                open={oj.open}
                fullWidth={true}
                maxWidth={"80%"}
                sx={{ width: "80%", left: "10%" }}
                onClose={oj.onClose}
                background={"none"}
            >
                <DialogTitle>Edit Code</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: "100%" }}>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selTyp.tt}
                            label="Age"
                            onChange={Typecodechang}
                        >
                            <MenuItem value="c">Language: c</MenuItem>
                            <MenuItem value="vb">Language: vb</MenuItem>
                            <MenuItem value="python">Language: python</MenuItem>
                            <MenuItem value="css">Language: css</MenuItem>
                            <MenuItem value="html">Language: html</MenuItem>
                            <MenuItem value="json">Language: json</MenuItem>
                            <MenuItem value="java">Language: java</MenuItem>
                            <MenuItem value="javascript">Language: javascript</MenuItem>
                            <MenuItem value="jsx">Language: jsx</MenuItem>
                            <MenuItem value="scss">Language: scss</MenuItem>
                            <MenuItem value="ini">Language: ini</MenuItem>
                            <MenuItem value="sql">Language: sql</MenuItem>
                            <MenuItem value="mysql">Language: mysql</MenuItem>
                            <MenuItem value="vbscript">Language: vbscript</MenuItem>
                            <MenuItem value="verilog">Language: verilog</MenuItem>

                            <MenuItem value="bat">Language: bat</MenuItem>
                            <MenuItem value="coffeescript">Language: coffeescript</MenuItem>
                            <MenuItem value="csharp">Language: csharp</MenuItem>
                            <MenuItem value="dart">Language: dart</MenuItem>
                            <MenuItem value="dockerfile">Language: dockerfile</MenuItem>
                            <MenuItem value="flow9">Language: flow9</MenuItem>
                            <MenuItem value="go">Language: go</MenuItem>
                            <MenuItem value="graphql">Language: graphql</MenuItem>
                            <MenuItem value="handlebars">Language: handlebars</MenuItem>

                            <MenuItem value="julia">Language: julia</MenuItem>
                            <MenuItem value="kotlin">Language: kotlin</MenuItem>
                            <MenuItem value="nginx">Language: nginx</MenuItem>
                            <MenuItem value="objective-c">Language: objective-c</MenuItem>
                            <MenuItem value="pgsql">Language: pgsql</MenuItem>
                            <MenuItem value="php">Language: php</MenuItem>
                            <MenuItem value="plaintext">Language: plaintext</MenuItem>
                            <MenuItem value="powerquery">Language: powerquery</MenuItem>
                            <MenuItem value="powershell">Language: powershell</MenuItem>
                            <MenuItem value="shell">Language: shell</MenuItem>
                            <MenuItem value="sparql">Language: sparql</MenuItem>

                            <MenuItem value="vue">Language: vue</MenuItem>
                            <MenuItem value="xml">Language: xml</MenuItem>
                        </Select>
                        <CodeEdit textcheng={codechang} type={selTyp.tt} code={selTyp.tcode} />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={bt_Cancel} sx={{ color: "#D9DCDF" }}>
                        Cancel
                    </Button>
                    <Button sx={{ color: "#20DBC2" }} onClick={BT_oj.onClick}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
