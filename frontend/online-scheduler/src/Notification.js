import {notification} from "antd";
function openNotificationWithIcon (type, message, description, placement){
    const func = () => {
        notification.open({
            message: `${message}`,
            description: `${description}`,
            placement,
        });
    };

    func();
}

export const successNotification = (message, description, placement) => {
    openNotificationWithIcon('success', message, description, placement);
}

export const errorNotification = (message, description, placement) =>
    openNotificationWithIcon('error', message, description, placement);