import { Calendar } from "antd";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTourDetail } from "~/apis";
import dayjs from "dayjs";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NotFound from "../Error/NotFound";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);
export default function TourDetail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [detailTour, setDetailTour] = useState(null);
  const [checkTour, setCheckTour] = useState(false);
  const calendarRef = useRef(null);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const getTour = () => {
    getTourDetail(id)
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setCheckTour(true);
      });
  };
  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (id) getTour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [moneyByDay, setMoneyByDay] = useState({});

  useEffect(() => {
    if (data?.schedules?.length > 0) {
      const updatedMoneyByDay = data.schedules.reduce((acc, schedule) => {
        const formattedDate = dayjs(schedule.departureDate).format(
          "YYYY-MM-DD"
        );
        acc[formattedDate] = schedule.priceAdult;
        return acc;
      }, {});
      setMoneyByDay((prevState) => ({
        ...prevState,
        ...updatedMoneyByDay,
      }));
    }
  }, [data]);

  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const money = moneyByDay[dateStr];
    const handleClick = () => {
      if (!money) {
        console.log(data);
        setDetailTour(data.schedules[0]);
        return;
      }
      const selectedSchedule = data.schedules.find(
        (schedule) =>
          dayjs(schedule.departureDate).format("YYYY-MM-DD") === dateStr
      );
      if (selectedSchedule) {
        setDetailTour(selectedSchedule);
      }
    };

    return (
      <button
        className={`absolute top-0 right-0 left-0 bottom-0 ${
          money ? "cursor-pointer" : "cursor-default bg-slate-100 opacity-50"
        }`}
        onClick={handleClick}
        disabled={!money}
      >
        {money && (
          <span className="absolute top-1/3 right-0 left-1/4 bottom-0 mx-auto text-red-600 font-bold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(money)}
          </span>
        )}
      </button>
    );
  };

  if (checkTour) {
    return <NotFound />;
  }
  return (
    <div className="py-8">
      <div className="max-w-[1600px] mx-auto gap-8 grid grid-cols-7 max-lg:flex flex-col">
        <div className="col-span-5">
          <div className="w-full ">
            <Swiper
              pagination={true}
              // loop={true}
              slidesPerView={1}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper "
            >
              {data?.images?.length > 0 &&
                data?.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="w-full h-[500px] mx-auto"
                      src={`${item}`}
                      alt=""
                      style={{ objectFit: "contain" }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="py-[30px] border-b">
            <h3 className="font-bold text-3xl">{data?.name}</h3>
          </div>
          <div>
            <h3 className="py-[20px] font-bold text-2xl">Tổng quan</h3>
            <div className="w-full">
              <p className="text-base font-semibold text-gray-700 text-wrap text-justify">
                {data?.detail}
              </p>
            </div>
          </div>

          <div>
            <h3 className="py-[20px] font-bold text-2xl">Lịch trình & Giá</h3>
            <div ref={calendarRef}>
              {detailTour ? (
                <div className="w-full shadow-lg h-[400px] rounded-lg bg-white">
                  <div className="flex items-center justify-between pr-[30px]">
                    <button
                      className="py-[20px] px-[10px] flex items-center gap-2"
                      onClick={() => setDetailTour(null)}
                    >
                      <ArrowLeft className="mx-auto" />
                      <span className="font-bold text-base">Quay lại</span>
                    </button>
                    <div>
                      <h2 className="font-bold text-red-600 text-2xl">
                        {dayjs(detailTour?.departureDate).format("DD/MM/YYYY")}
                      </h2>
                    </div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-center text-blue-800 text-xl font-semibold">
                      Thời gian
                    </h3>
                    <div className="flex items-center w-full justify-center gap-[10px] py-[20px] max-md:flex-col">
                      <div className="flex items-center">
                        <span className="font-bold text-base pr-2">
                          Ngày khởi hành
                        </span>{" "}
                        <span>
                          {" "}
                          -{" "}
                          {dayjs(detailTour?.departureDate).format(
                            "DD/MM/YYYY"
                          )}
                        </span>
                      </div>
                      <div>
                        <span>
                          <ArrowRight className="w-[200px]" />
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-base pr-2">
                          Ngày kết thúc
                        </span>
                        <span>
                          {" "}
                          - {dayjs(detailTour?.returnDate).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-center text-blue-800 text-xl font-semibold">
                      Giá tour
                    </h3>
                    <div className="flex items-center w-full justify-center gap-[10px] py-[20px] h-[100px]">
                      <div className="flex items-center w-[300px] justify-between border-r-2 px-[30px] border-gray-400 h-full">
                        <span className="font-bold text-base pr-2">
                          Người lớn:
                        </span>
                        <span className="text-red-600 font-bold">
                          {detailTour?.priceAdult &&
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(detailTour?.priceAdult)}
                        </span>
                      </div>
                      <div className="flex items-center w-[300px] justify-between px-[30px] h-full">
                        <span className="font-bold text-base pr-2">
                          Trẻ em:
                        </span>
                        <span className="text-red-600 font-bold">
                          {detailTour?.priceChild &&
                            new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(detailTour?.priceChild)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`calendar-container ${
                    data?.schedules[0]?.remain === 0 ||
                    dayjs(data?.departure).isBefore(dayjs(), "day")
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <Calendar
                    onPanelChange={onPanelChange}
                    cellRender={dateCellRender}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="sticky top-[50px] shadow-lg h-[300px] bg-white rounded-lg">
            <div className="p-5 ">
              <p className="text-xl"> {detailTour ? "Giá:" : "Giá từ:"} </p>
              <h2 className="text-2xl text-center py-[10px]">
                <span className="text-red-600 font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    detailTour
                      ? detailTour.priceAdult
                      : data?.schedules[0]?.priceAdult
                  )}
                </span>
                /Người
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl">Nơi khởi hành:</span>
                  <span className="text-base">{data?.departure}</span>
                </div>
                {detailTour && (
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl">Ngày khởi hành:</span>
                  <span className="text-base">
                    {dayjs(detailTour.departureDate).format("DD/MM/YYYY")}
                  </span>
                </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xl">Điểm đến:</span>
                  <span className="text-base">{data?.destination}</span>
                </div>
              </div>
              {detailTour ? (
                <Link to={`/order-booking/${detailTour.id}`}>
                  <button className="w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg">
                    Đặt Tour
                  </button>
                </Link>
              ) : (
                <button
                  onClick={scrollToCalendar}
                  disabled={
                    data?.schedules[0]?.remain === 0 ||
                    dayjs(data?.departure).isBefore(dayjs(), "day")
                  }
                  className={`w-full bg-red-600 text-white text-xl h-[50px] mt-[20px] rounded-lg ${
                    data?.schedules[0]?.remain === 0 ||
                    dayjs(data?.departure).isBefore(dayjs(), "day")
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Chọn ngày khởi hành
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
