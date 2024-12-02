import BookingDetails from "~/pages/Client/BookTour/BookingDetails.jsx";
import BookingConfirmation from "~/pages/Client/BookTour/BookingConfirmation.jsx";
import PayMoney from "~/pages/Client/BookTour/PayMoney.jsx";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";

function PayMethod() {

    const styles = {
        wrapper: {
            display: 'flex',
            justifyContent: 'center', // Căn giữa theo chiều ngang
            padding: '0 20px', // Thêm padding cho wrapper
            boxSizing: 'border-box', // Đảm bảo padding không làm thay đổi chiều rộng/chiều cao
        },
        content: {
            display: 'flex',
            flexDirection: 'column', // Sắp xếp theo chiều dọc (một cột)
            alignItems: 'center', // Căn giữa theo chiều ngang
            width: '100%',
            maxWidth: '600px', // Giới hạn chiều rộng tối đa của phần tử con (tùy chỉnh theo nhu cầu)
            boxSizing: 'border-box',
            padding: '20px', // Padding bên trong phần tử con
            gap: '20px', // Khoảng cách giữa các phần tử trong cột
        },
        content2: {
            display: 'flex',
            flexDirection: 'column', // Sắp xếp theo chiều dọc (một cột)
            width: '100%',
            maxWidth: '600px', // Giới hạn chiều rộng tối đa của phần tử con (tùy chỉnh theo nhu cầu)
            boxSizing: 'border-box',
            padding: '20px', // Padding bên trong phần tử con
            gap: '20px', // Khoảng cách giữa các phần tử trong cột
        },
    };
    const MyComponent = () => {
        return (
            <div style={styles.wrapper}>
                <div style={styles.content}>
                    <BookingDetails/>
                    <BookingConfirmation/>
                    
                </div>
                <div style={styles.content2}>
                    <PayMoney/>
                </div>
            </div>
        );

    }
    // return (
    //     <>
    //         
    //         
    //         
    //     </>
    // )
    return MyComponent();
}

export default PayMethod;