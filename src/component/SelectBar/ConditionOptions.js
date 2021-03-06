import * as React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetSearch } from "../../action";

import {
    Box,
    Tabs,
    Tab,
    Typography,
    Slider,
    FormControl,
    Checkbox,
    TextField,
    FormControlLabel,
    FormGroup
} from "@mui/material";

function ConditionOptions() {
    const searchData = useSelector(state => state.Search);
    const dispatch = useDispatch();

    const marks = [
        {
            value: 0,
            label: "0",
        },
        {
            value: 10000,
            label: "10,000",
        },
        {
            value: 20000,
            label: "20,000",
        },
        {
            value: 30000,
            label: "30,000",
        },
        {
            value: 40000,
            label: "40,000",
        },
    ];

    const handleChangeHouseType = (event, newValue) => { // 修改房屋類型
        dispatch(SetSearch("setHouseType", newValue));
    }

    const handleChangGender = (event, newValue) => { // 修改房屋類型
        dispatch(SetSearch("setGender", newValue));
    }

    const handleChangeRoomType = (event, newValue) => { // 修改房間類型
        dispatch(SetSearch("setRoomType", newValue));
        switch (newValue) {
        case "整層住家": {
            dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, "房間": 1, "衛浴": 1, "廳數": 1}));
            break;
        }
        case "獨立套房": {
            dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, "房間": 1, "衛浴": 1, "廳數": 0}));
            break;
        }
        case "分租套房": {
            dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, "房間": 1, "衛浴": 1, "廳數": 1}));
            break;
        }
        case "分租雅房": {
            dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, "房間": 1, "衛浴": 0, "廳數": 1}));
            break;
        }
        case "雅房": {
            dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, "房間": 1, "衛浴": 0, "廳數": 0}));
            break;
        }
        default: {
            break;
        }
        }
    }

    const handleChangeRoom = (event, name) => { // 修改房屋格局
        if (event.target.value >= 0) { dispatch(SetSearch("setRoom", {...searchData.houseInfo.room, [name]: parseInt(event.target.value)})); }
    }

    const handleChangeRent = (event, newValue) => { // 修改租金範圍
        dispatch(SetSearch("setPriceRange", newValue));
    }

    const handleChangeTextRent = (event, index) => { // 修改租金範圍
        const value = Array.from(searchData.priceRange);
        const newValue = parseInt(event.target.value);
        if (newValue >= 0) {
            value[index] = newValue; // 給予絕對值，不可輸入負值
            dispatch(SetSearch("setPriceRange", value));
        }
    };

    const handleCheckTextRent = () => { // 檢查上限與下限，進行適當交換
        const [min, max] = Array.from(searchData.priceRange);
        if (min > max) {
            dispatch(SetSearch("setPriceRange", [max, min]));
        }
    };

    const rowProps = () => {
        return {
            sx: {
                mb: 1
            }
        }
    };

    const tabProps = (label, value) => { // Style
        return {
            "label": label,
            "value": value,
            "sx": {
                fontSize: "0.9rem",
                px: 1,
                py: 0,
                minHeight: "1.5rem",
                minWidth: "2rem",
                overflow: "default"
            }
        }
    }

    const numberProps = (sx={}) => { // {p: 2}
        return {
            size: "sm",
            type: "number",
            inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*"
            },
            InputLabelProps: { shrink: true },
            sx: {
                width: "6rem",
                mx: "0.2rem",
                ...sx
            }
        }
    }
    const roomProps = (name) => {
        return {
            label: name,
            value: searchData.houseInfo.room[name],
            disabled: searchData.houseInfo.roomType !== null
        }
    }

    const titleProps = (title) => {
        return {
            color: "rgba(0, 0, 0, 0.6)",
            children: title
        }
    }

    const isChecked = (name) => {
        const roles = new Set(searchData.equipmentAndServices.condition.role);
        return roles.has(name);
    }
    const [unlimited, setUnlimited] = useState(false);

    const handleChangeRole = (event) => {
        const checked = event.target.checked;
        const name = event.target.name;
        const roles = new Set(searchData.equipmentAndServices.condition.role);
        if (name === "不限") {
            if (!checked) {
                //
            } else {
                roles.clear();
            }
            setUnlimited(checked);
        } else {
            if (!checked) {
                roles.delete(name);
            } else {
                roles.add(name);
            }
            // setUnlimited(cityData[county].length === countyList.size);
        }
        dispatch(SetSearch("setRoles", Array.from(roles)));
    };
    return (
        <>
            <Box {...rowProps()}>
                <Typography {...titleProps("房屋類型")} />
                <Box sx={{pl: 2, py: 1}}>
                    <Tabs value={searchData.houseInfo.houseType} onChange={handleChangeHouseType} sx={{minHeight: "0" }}>
                        <Tab {...tabProps("不限", null)} />
                        <Tab {...tabProps("公寓", "公寓")} />
                        <Tab {...tabProps("電梯大樓", "電梯大樓")} />
                        <Tab {...tabProps("透天厝", "透天厝")} />
                        <Tab {...tabProps("別墅", "別墅")} />
                    </Tabs>
                </Box>
            </Box>
            <Box {...rowProps()}>
                <Typography {...titleProps("房間類型")} />
                <Box sx={{pl: 2, py: 1}}>
                    <Tabs value={searchData.houseInfo.roomType} onChange={handleChangeRoomType} sx={{minHeight: "0" }}>
                        <Tab {...tabProps("不限", null)} />
                        <Tab {...tabProps("整層住家", "整層住家")} />
                        <Tab {...tabProps("獨立套房", "獨立套房")} />
                        <Tab {...tabProps("分租套房", "分租套房")} />
                        <Tab {...tabProps("分租雅房", "分租雅房")} />
                        <Tab {...tabProps("雅房", "雅房")} />
                    </Tabs>
                </Box>
            </Box>
            <Box {...rowProps()}>
                <Typography {...titleProps("房間格局")} />
                <Box sx={{ display: "flex" ,pl: 2, py: 1}}>
                    <Box sx={{pt: 1}}>
                        <TextField
                            onChange={(e) => handleChangeRoom(e, "房間")}
                            {...numberProps()}
                            {...roomProps("房間")}
                        />
                        <TextField
                            onChange={(e) => handleChangeRoom(e, "衛浴")}
                            {...numberProps()}
                            {...roomProps("衛浴")}
                        />
                        <TextField
                            onChange={(e) => handleChangeRoom(e, "廳數")}
                            {...numberProps()}
                            {...roomProps("廳數")}
                        />
                    </Box>
                </Box>
            </Box>
            <Box {...rowProps()}>
                <Typography {...titleProps("租金")} />
                <Box sx={{pl: 2, py: 1}}>
                    <Box sx={{ width: "20rem", pt: 1 }}>
                        <Box>
                            <TextField
                                onChange={(e) => handleChangeTextRent(e, 0)}
                                onBlur={handleCheckTextRent}
                                label='下限'
                                value={searchData.priceRange[0]}
                                {...numberProps({width: "9.2rem"})}
                            />
                            <TextField
                                onChange={(e) => handleChangeTextRent(e, 1)}
                                onBlur={handleCheckTextRent}
                                label='上限'
                                value={searchData.priceRange[1]}
                                {...numberProps({width: "9.2rem"})}
                            />
                        </Box>
                        <Slider
                            sx={{ mx: "0.2rem", width: "18.4rem" }}
                            value={searchData.priceRange}
                            onChange={handleChangeRent}
                            min={0}
                            step={100}
                            max={40000}
                            marks={marks}
                            // disableSwap
                        />
                    </Box>
                </Box>
            </Box>
            <Box {...rowProps()}>
                <Typography {...titleProps("身分限制")} />
                <FormControl>
                    {/* <FormLabel id="county-group">身分限制：</FormLabel> */}
                    <FormGroup
                        row
                        sx={{ pl: 2 }}
                    >
                        <FormControlLabel key={0} sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.8rem", color: unlimited && "blue" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}}
                            control={<Checkbox checked={unlimited} onChange={handleChangeRole} name={"不限"} />} label={"不限"}/>
                        <FormControlLabel key={1} disabled={unlimited} sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem", color: isChecked("學生") && "blue" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}}
                            control={<Checkbox checked={ isChecked("學生") } onChange={handleChangeRole} name={"學生"} />} label={"學生"}/>
                        <FormControlLabel key={2} disabled={unlimited} sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem", color: isChecked("上班族") && "blue" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}}
                            control={<Checkbox checked={ isChecked("上班族") } onChange={handleChangeRole} name={"上班族"} />} label={"上班族"}/>
                        <FormControlLabel key={3} disabled={unlimited} sx={{"& .MuiFormControlLabel-label": { fontSize: "0.8rem", color: isChecked("家庭") && "blue" }, "& .MuiSvgIcon-root": { fontSize: "0.8rem" }}}
                            control={<Checkbox checked={ isChecked("家庭") } onChange={handleChangeRole} name={"家庭"} />} label={"家庭"}/>
                    </FormGroup>
                </FormControl>
            </Box>
            <Box {...rowProps()}>
                <Typography {...titleProps("性別限制")} />
                <Box sx={{pl: 2, py: 1}}>
                    <Tabs value={searchData.equipmentAndServices.condition.gender} onChange={handleChangGender} sx={{minHeight: "0" }}>
                        <Tab {...tabProps("不限", null)} />
                        <Tab {...tabProps("限男性", "限男性")} />
                        <Tab {...tabProps("限女性", "限女性")} />
                    </Tabs>
                </Box>
            </Box>
        </>
    )
}

export default ConditionOptions;
