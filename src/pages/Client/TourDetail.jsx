import { Calendar } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getTourDetail } from "~/apis";
import dayjs from 'dayjs';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
export default function TourDetail() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [showDetailTour, setShowDetailTour] = useState(false)
    const calendarRef = useRef(null);
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const getTour = () => {
        getTourDetail(id).then((data) => {
            setData(data)
        })
    }
    const scrollToCalendar = () => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (id) getTour();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    const [moneyByDay, setMoneyByDay] = useState({});

    useEffect(() => {
        if (data?.departure && data?.schedules[0]?.priceAdult) {
            const formattedDate = dayjs(data?.departure).format('YYYY-MM-DD');
            setMoneyByDay(prevState => ({
                ...prevState,
                [formattedDate]: data?.schedules[0]?.priceAdult
            }));
        }
    }, [data]);

    const dateCellRender = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        const money = moneyByDay[dateStr];

        return (
            <div className="absolute top-0 right-0 left-0 bottom-0" onClick={() => money && setShowDetailTour(true)}>
                {money && <span className="absolute top-1/3 right-0 left-1/4 bottom-0 mx-auto text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)}</span>}
            </div>
        );
    };


    return (
        <div className="py-8">
            <div className="max-w-[1600px] mx-auto gap-8 grid grid-cols-7 max-lg:flex flex-col">
                <div className="col-span-5">
                    <div className="w-full ">
                        <Swiper
                            pagination={true}
                            loop={true}
                            slidesPerView={1}
                            navigation={true} modules={[Navigation]}
                            className="mySwiper "
                        >
                            { data?.images?.length> 0 &&  data?.images.map((item) => (
                                <SwiperSlide key={item?.id}>
                                    <img
                                        className="w-full h-[500px] mx-auto"
                                        src={`${item}`} alt=""
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                    <div className="py-[30px] border-b">
                        <h3 className="font-bold text-3xl">{data?.name}</h3>
                    </div>
                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Overview</h3>
                        <div className="w-full">
                            <p className="text-base font-semibold text-gray-700 text-wrap text-justify">
                                {data?.detail}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="py-[20px] font-bold text-2xl">Calendar & Prices</h3>
                        <div ref={calendarRef}>
                            {
                                showDetailTour ?
                                    <div className="w-full shadow-lg h-[400px] rounded-lg bg-white">
                                        <div className="flex items-center justify-between pr-[30px]">
                                            <button className="py-[20px] px-[10px] flex items-center gap-2" onClick={() => setShowDetailTour(false)}>
                                                <ArrowLeft className="mx-auto" />
                                                <span className="font-bold text-base">Back</span>
                                            </button>
                                            <div>
                                                <h2 className="font-bold text-red-600 text-2xl">{dayjs(data?.departure).format('DD/MM/YYYY')}</h2>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-center text-blue-800 text-xl font-semibold">Means of transport</h3>
                                            <div className="flex items-center w-full justify-center gap-[10px] py-[20px] max-md:flex-col">
                                                <div className="flex items-center">
                                                    <span className="font-bold text-base pr-2">Departure date</span> <span> - {dayjs(data?.departure).format('DD/MM/YYYY')}</span>
                                                </div>
                                                <div>
                                                    <span><ArrowRight className="w-[200px]" /></span>
                                                </div>
                                                <div>
                                                    <span className="font-bold text-base pr-2">Return date</span>
                                                    <span> - {dayjs(data?.departure).add(data?.duration, 'day').format('DD/MM/YYYY')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-center text-blue-800 text-xl font-semibold">Tour price</h3>
                                            <div className="flex items-center w-full justify-center gap-[10px] py-[20px] h-[100px]">
                                                <div className="flex items-center w-[300px] justify-between border-r-2 px-[30px] border-gray-400 h-full">
                                                    <span className="font-bold text-base pr-2">Adult:</span>
                                                    <span className="text-red-600 font-bold">
                                                        {data?.schedules[0]?.priceAdult && new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(data?.schedules[0]?.priceAdult)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center w-[300px] justify-between px-[30px] h-full">
                                                    <span className="font-bold text-base pr-2">Child:</span>
                                                    <span className="text-red-600 font-bold">
                                                        {data?.schedules[0]?.priceChild && new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(data?.schedules[0]?.priceChild)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <Calendar onPanelChange={onPanelChange} dateCellRender={dateCellRender} />
                            }
                        </div>
                    </div>

                </div>
                <div className="col-span-2">
                    <div className="sticky top-[50px] shadow-lg h-[300px] bg-white rounded-lg">
                        <div className="p-5 ">
                            <p className="text-xl">Price: </p>
                            <h2 className="text-2xl text-center py-[10px]"><span className="text-red-600 font-bold">{new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(data?.schedules[0]?.priceAdult)}</span>/Person</h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl">Departure:</span>
                                    <span className="text-base">
                                        {data?.destination}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl">Departure Date:</span>
                                    <span className="text-base">
                                        {dayjs(data?.departure).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                            {
                                showDetailTour ?
                                    <button className="w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg">
                                        Book Tour
                                    </button>
                                    :
                                    <button onClick={scrollToCalendar} className="w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg">
                                        Choose Departure Date
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
