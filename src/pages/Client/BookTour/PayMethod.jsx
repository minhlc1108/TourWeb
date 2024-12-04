import BookingDetails from "~/pages/Client/BookTour/PAY/BookingDetails.jsx";
import BookingConfirmation from "~/pages/Client/BookTour/PAY/BookingConfirmation.jsx";
import PayMoney from "~/pages/Client/BookTour/PAY/PayMoney.jsx";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {useEffect, useState} from "react";
import {getBookingByIdAPI, getTourScheduleByIdAPI} from "~/apis/index.js";

function PayMethod() {
    const [booking, setBooking] = useState(null);   
    const [tourSchedule, setTourSchedule] = useState(null);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);       
    const styles = {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',  
            padding: '0 20px', 
            boxSizing: 'border-box', 
        },
        content: {
            display: 'flex',
            flexDirection: 'column',  
            alignItems: 'center',  
            width: '100%',
            maxWidth: '600px',  
            boxSizing: 'border-box',
            padding: '20px',  
            gap: '20px',  
        },
        content2: {
            display: 'flex',
            flexDirection: 'column', 
            width: '100%',
            maxWidth: '600px',  
            boxSizing: 'border-box',
            padding: '20px',  
            gap: '20px',  
        },
    };
    const bookingId = ""
//     const sampleTourSchedule = {
//         id: 1,
//         name: "Tour to Paris",
//         departureDate: "2024-05-01", // Dữ liệu ngày được định dạng dưới dạng chuỗi
//         returnDate: "2024-05-07",
//         remain: 10,
//         priceAdult: 1000,
//         priceChild: 500,
//         status: 1, // Trạng thái 1: hoạt động
//         tourId: 101,
//         tour: {
//             id: 101,
//             name: "Paris Tour",
//             description: "A beautiful tour to Paris, exploring all famous spots"
//         }
//     };
//    
// setTourSchedule(sampleTourSchedule);
    
    useEffect(() => {
        // Hàm gọi API trong useEffect
        const fetchBooking = async () => {
            try {
                const bookingData = await getBookingByIdAPI(bookingId);  // Gọi API với bookingId
                setBooking(bookingData);   
                setLoading(false);         
            } catch (err) {
                setError(err);            
                setLoading(false);        
            }
        };
        
        const fetchTourSchedule = async () => {
            try {
                const tourScheduleData = await getTourScheduleByIdAPI(tourScheduleId); // Gọi API với tourScheduleId
                setTourSchedule(tourScheduleData);  
                setLoading(false);                   
            } catch (err) {
                setError(err);                      
                setLoading(false);                  
            }
        };


        fetchBooking();  
        fetchTourSchedule();   
        
    }, [bookingId]);  // useEffect sẽ chạy lại nếu bookingId thay đổi

    // Hiển thị loading, lỗi hoặc dữ liệu
    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
    const MyComponent = () => {
        return (
            <div style={styles.wrapper}>
                <div style={styles.content}>
                    <BookingDetails Booking={booking} />
                    <BookingConfirmation bookingId={12} TourSchedule={tourSchedule} />
                    
                </div>
                <div style={styles.content2}>
                    {/*<PayMoney/>*/}
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