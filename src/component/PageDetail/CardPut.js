import * as React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import Line from "./icons8-line.svg";
import {QRCodeSVG} from "qrcode.react";

import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Tooltip,
    Typography
} from "@mui/material";

export default function CardPut(props) {
    const {landlordStatus, landlordNickName, phoneNumber, lineAddress} = props.landlord;
    const displayPhoneNumber = `${phoneNumber.substring(0, 4)}-${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`;
    let landlordType;
    //0為房東, 1為代理人, 2為仲介
    switch (landlordStatus) {
    case 0: {
        landlordType = "房東";
        break;
    }
    case 1: {
        landlordType = "代理人";
        break;
    }
    case 2: {
        landlordType = "仲介";
        break;
    }
    default: {
        landlordType = "房東";
        break;
    }
    }

    return (
        <Box sx={{
            backgroundColor: "#ffffff"

        }}>
            <Card sx={{maxWidth: "610px", minHeight: 100, boxShadow: 3}}>
                <CardContent>
                    <Typography sx={{fontSize: 14}} color="text.secondary" component={"div"} gutterBottom>
                        <Grid container spacing={0}>
                            <Grid item>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalTnxL604AYAhRBLY8ALueAe3Z5yiauJxHA&usqp=CAU"
                                    sx={{width: 50, height: 50}}
                                />
                            </Grid>
                            <Grid item sx={{mt: 3, fontSize: 20}}>
                                {landlordType}：{landlordNickName}
                            </Grid>
                            <Grid item sx={{mt: 2, ml: 10, fontSize: 20}}>
                                <Tooltip title={<QRCodeSVG value={displayPhoneNumber}/>}>
                                    <Button size="medium" sx={{
                                        color: "white", borderRadius: 1, bgcolor: "#ff8000", ":hover": {
                                            bgcolor: "#ff8000", // theme.palette.primary.main
                                            color: "white",
                                        }
                                    }}><PhoneIcon/>{displayPhoneNumber}</Button>
                                </Tooltip>
                            </Grid>
                            <Grid item sx={{mt: 2, ml: 3, fontSize: 20, minWidth: 120}}>
                                <Tooltip title={<QRCodeSVG value={lineAddress}/>}>
                                    <Button size="medium" fullWidth sx={{
                                        color: "white", borderRadius: 1, bgcolor: "#23ba4f", ":hover": {
                                            bgcolor: "#23ba4f", // theme.palette.primary.main
                                            color: "white",
                                        }
                                    }}><img src={Line} width="24" height="24" alt="React Logo"/>LINE</Button>
                                </Tooltip>
                            </Grid>

                        </Grid>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}
