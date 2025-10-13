import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function WorkRecord() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [activeButton, setActiveButton] = useState(null); // 'start', 'rest', 'stop'
  
  const bgColor = '#f0f0f0';

  // 샘플 데이터 (실제로는 상태로 관리)
  const workData = {
    totalWorkTime: 0, // 시간
    totalRestTime: 0, // 시간
    details: []
  };

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }
    
    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const dayOfWeek = (firstDay + day - 1) % 7;
      const isSunday = dayOfWeek === 0;
      
      days.push({
        day,
        isToday,
        isSunday,
        key: `day-${day}`
      });
    }
    
    return days;
  };

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: bgColor}}>
      <div className="max-w-3xl mx-auto">
        {/* 돌아가기 버튼 박스 */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 inline-block">
          <button className="flex items-center gap-2 hover:opacity-80 text-gray-800">
            <ArrowLeft size={24} strokeWidth={3} />
            <span className="text-sm font-medium">돌아가기</span>
          </button>
        </div>

        {/* 메인 컨텐츠 박스 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-6">📝 노동 기록</h1>

          {/* 오늘의 노동시간 요약 */}
          <div className="mb-8 bg-gray-50 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-800 mb-4">📊 오늘의 노동시간</h3>
            
            {/* 간단한 막대기 보기 */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">💼 총 노동시간</span>
                  <span className="text-sm font-bold text-blue-600">{workData.totalWorkTime}시간</span>
                </div>
                <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{width: `${(workData.totalWorkTime / 12) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">☕ 총 휴식시간</span>
                  <span className="text-sm font-bold text-amber-600">{workData.totalRestTime}시간</span>
                </div>
                <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{width: `${(workData.totalRestTime / 12) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>

            {/* 시간대별 타임라인 */}
            <div className="pt-6 border-t-2 border-gray-300">
              {/* 총 시간 표시 */}
              <div className="flex justify-center gap-8 mb-6 pb-4 border-b-2 border-gray-300">
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">계획 시간</div>
                  <div className="text-lg font-bold text-gray-800">
                    {Math.floor(workData.totalWorkTime)}H {Math.round((workData.totalWorkTime % 1) * 60)}M
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600 mb-1">실제 기록</div>
                  <div className="text-lg font-bold text-blue-600">
                    {Math.floor(workData.totalWorkTime)}H {Math.round((workData.totalWorkTime % 1) * 60)}M
                  </div>
                </div>
              </div>

              {/* 24시간 타임라인 */}
              <div className="relative">
                {Array.from({ length: 24 }, (_, hour) => (
                  <div key={hour} className="flex items-center gap-2 h-10">
                    <div className="w-8 text-xs text-gray-500 text-right">
                      {hour.toString().padStart(2, '0')}
                    </div>
                    <div className="flex-1 relative border-b border-dashed border-gray-300">
                      {/* 여기에 해당 시간대의 노동/휴식 막대가 표시됩니다 */}
                      {workData.details
                        .filter(record => {
                          const startHour = parseInt(record.startTime.split(':')[0]);
                          const endHour = parseInt(record.endTime.split(':')[0]);
                          return hour >= startHour && hour < endHour;
                        })
                        .map((record, idx) => (
                          <div
                            key={idx}
                            className="absolute inset-y-0 rounded-lg"
                            style={{
                              left: 0,
                              right: 0,
                              bottom: 0,
                              height: '32px',
                              backgroundColor: record.type === '노동' ? '#60a5fa' : '#fbbf24',
                              opacity: 0.8
                            }}
                          />
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 달력 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl font-bold">‹</span>
              </button>
              <div className="text-lg font-bold">
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </div>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl font-bold">›</span>
              </button>
            </div>

            <div className="border-2 border-gray-300 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    {dayNames.map((day, index) => (
                      <th 
                        key={day} 
                        className={`p-2 text-xs font-semibold ${index === 0 ? 'text-red-600' : 'text-gray-700'}`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(generateCalendarDays().length / 7) }, (_, weekIndex) => (
                    <tr key={weekIndex}>
                      {generateCalendarDays().slice(weekIndex * 7, (weekIndex + 1) * 7).map((dayObj) => {
                        if (dayObj.empty) {
                          return <td key={dayObj.key} className="p-2 h-16 bg-gray-50"></td>;
                        }
                        return (
                          <td 
                            key={dayObj.key}
                            onClick={() => setSelectedDate(dayObj.day)}
                            className={`p-2 h-16 text-left align-top cursor-pointer hover:bg-blue-50 transition-colors ${
                              dayObj.isToday ? 'bg-blue-100' : ''
                            }`}
                          >
                            <span className={`inline-block px-2 py-1 rounded text-sm ${
                              dayObj.isToday ? 'bg-blue-300 font-bold text-blue-900' : ''
                            } ${
                              dayObj.isSunday ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {dayObj.day}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 선택한 날짜의 기록 */}
          {selectedDate && (
            <div>
              <div className="text-sm font-bold text-gray-800 mb-4">
                📅 선택한 날짜의 기록: {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]} {selectedDate}일
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveButton('start')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
                    activeButton === 'start'
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-500 bg-opacity-30 text-gray-800 hover:bg-opacity-40'
                  }`}
                >
                  시작
                </button>
                <button 
                  onClick={() => setActiveButton('rest')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
                    activeButton === 'rest'
                      ? 'bg-amber-400 text-white'
                      : 'bg-amber-400 bg-opacity-30 text-gray-800 hover:bg-opacity-40'
                  }`}
                >
                  휴식
                </button>
                <button 
                  onClick={() => setActiveButton('stop')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
                    activeButton === 'stop'
                      ? 'bg-red-500 text-white'
                      : 'bg-red-500 bg-opacity-30 text-gray-800 hover:bg-opacity-40'
                  }`}
                >
                  중단
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
