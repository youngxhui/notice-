import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
function BaseSettingComponent() {
    const [whiteList, setWhiteList] = useState('');
    const [noticeText, setNoticeText] = useState('');
    const [status, setStatus] = useState('');
    const [showMsg] = useState(chrome.i18n.getMessage("showMsg"))
    const [whiteListMsg] = useState(chrome.i18n.getMessage("whiteListMsg"))
    const [settingInfoMsg] = useState(chrome.i18n.getMessage("settingInfoMsg"))
    const [saveMsg] = useState(chrome.i18n.getMessage("save"))

    useEffect(() => {
        restoreOptions();
    }, []);

    const saveOptions = () => {
        chrome.storage.local.set({ whiteList: whiteList, noticeText: noticeText }, function () {
            const saveSuccessText = chrome.i18n.getMessage("save_success");
            setStatus(saveSuccessText);
        });
    };
    const style = {
        marginTop: '20px',
    }
    const restoreOptions = () => {
        chrome.storage.local.get(['whiteList', 'noticeText'], function (items) {
            let loadedNoticeText = items.noticeText || '';
            let loadedWhiteList = items.whiteList || '';

            setNoticeText(loadedNoticeText);
            setWhiteList(loadedWhiteList);

            const loadSuccessText = chrome.i18n.getMessage("load_success");
            setStatus(loadSuccessText);
        });
    };
    return (<>
        <div className="2-27">
            <Typography variant="h4" className="py-4">{whiteListMsg}</Typography>
            <TextField fullWidth margin="normal"  label={showMsg} variant="standard" value={noticeText} onChange={(e) => setNoticeText(e.target.value)} />

            <TextField fullWidth margin="normal"  value={whiteList} label={settingInfoMsg} onChange={(e) => setWhiteList(e.target.value)} />

            <Typography margin="normal">{status}</Typography>
            <Button onClick={saveOptions} variant="contained" disableElevation>{saveMsg}</Button>
        </div>


    </>)
}

export default BaseSettingComponent;