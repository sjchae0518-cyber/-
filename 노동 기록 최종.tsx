import React, { useState, useEffect } from 'react';

export default function WorkManagement() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isWorking, setIsWorking] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [todayWorkTime, setTodayWorkTime] = useState(0);
  const [todayRestTime, setTodayRestTime] = useState(0);
  const [hourlyWage, setHourlyWage] = useState(9860);
  const [workRecords, setWorkRecords] = useState({});
  const [schedules, setSchedules] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showWageModal, setShowWageModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleInput, setScheduleInput] = useState('');

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    let interval;
    if ((isWorking || isResting) && startTime) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isWorking, isResting, startTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isWorking && !isResting) {
      setIsWorking(true);
      setStartTime(Date.now());
      setCurrentTime(0);
    }
  };

  const handleRest = () => {
    if (isWorking && !isResting) {
      setIsResting(true);
      setIsWorking(false);
      const workTime = currentTime;
      setTodayWorkTime(prev => prev + workTime);
      setStartTime(Date.now());
      setCurrentTime(0);
    } else if (isResting) {
      setIsResting(false);
      setIsWorking(true);
      const restTime = currentTime;
      setTodayRestTime(prev => prev + restTime);
      setStartTime(Date.now());
      setCurrentTime(0);
    }
  };

  const handleStop = () => {
    if (isWorking) {
      const workTime = currentTime;
      setTodayWorkTime(prev => prev + workTime);
    } else if (isResting) {
      const restTime = currentTime;
      setTodayRestTime(prev => prev + restTime);
    }
    setIsWorking(false);
    setIsResting(false);
    setStartTime(null);
    setCurrentTime(0);
  };

  const calculateWage = () => {
    const totalHours = todayWorkTime / 1000 / 3600;
    const basicWage = totalHours * hourlyWage;
    
    // 연장근로수당 (1일 8시간 초과 시 1.5배)
    const overtimeHours = Math.max(0, totalHours - 8);
    const overtimeWage = overtimeHours * hourlyWage * 0.5;
    
    return Math.floor(basicWage + overtimeWage);
  };

  const getMonthlyStats = () => {
    const dailyHours = todayWorkTime / 1000 / 3600;
    const monthlyWorkDays = 20; // 주 5일 기준
    const weeklyWorkDays = 5;
    
    // 월 총 근무시간
    const totalMonthlyHours = dailyHours * monthlyWorkDays;
    
    // 기본급
    const basicMonthlyWage = totalMonthlyHours * hourlyWage;
    
    // 연장근로수당 (1일 8시간 초과분)
    const dailyOvertimeHours = Math.max(0, dailyHours - 8);
    const monthlyOvertimeWage = dailyOvertimeHours * monthlyWorkDays * hourlyWage * 0.5;
    
    // 주휴수당 (주 15시간 이상 근무 시)
    const weeklyHours = dailyHours * weeklyWorkDays;
    let weeklyHolidayWage = 0;
    if (weeklyHours >= 15) {
      // 주휴수당 = (1주 근로시간 / 주 소정근로일수) × 시급
      const weeklyHolidayHours = weeklyHours / weeklyWorkDays;
      weeklyHolidayWage = weeklyHolidayHours * hourlyWage * 4; // 월 4주 기준
    }
    
    const estimatedMonthlyWage = Math.floor(basicMonthlyWage + monthlyOvertimeWage + weeklyHolidayWage);
    
    return { 
      totalWorkHours: dailyHours, 
      estimatedMonthlyHours: totalMonthlyHours,
      estimatedMonthlyWage,
      weeklyHolidayWage: Math.floor(weeklyHolidayWage),
      overtimeWage: Math.floor(monthlyOvertimeWage)
    };
  };

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
    
    for (let i = 0; i < firstDay; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const today = new Date();
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const dayOfWeek = (firstDay + day - 1) % 7;
      const isSunday = dayOfWeek === 0;
      const dateKey = `${year}-${month}-${day}`;
      
      days.push({
        day,
        isToday,
        isSunday,
        hasRecord: workRecords[dateKey],
        hasSchedule: schedules[dateKey] && schedules[dateKey].length > 0,
        key: `day-${day}`
      });
    }
    
    return days;
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setScheduleInput(schedules[dateKey] || '');
    setShowScheduleModal(true);
  };

  const saveSchedule = () => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`;
    if (scheduleInput.trim()) {
      setSchedules({
        ...schedules,
        [dateKey]: scheduleInput.trim()
      });
    } else {
      const newSchedules = { ...schedules };
      delete newSchedules[dateKey];
      setSchedules(newSchedules);
    }
    setShowScheduleModal(false);
    setScheduleInput('');
  };

  const deleteSchedule = () => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${selectedDate}`;
    const newSchedules = { ...schedules };
    delete newSchedules[dateKey];
    setSchedules(newSchedules);
    setShowScheduleModal(false);
    setScheduleInput('');
  };

  const stats = getMonthlyStats();

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif", paddingBottom: '30px' }}>
      <div style={{ maxWidth: '430px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '42px', fontWeight: '700', color: '#6BA3D4', letterSpacing: '1px', fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif" }}>
            Dom Dom
          </div>
          <div style={{ fontSize: '12px', color: '#6BA3D4', marginTop: '5px' }}>
            외국인 노동자 도우미 앱
          </div>
        </div>

        {/* 뒤로가기 버튼 */}
        <div style={{ backgroundColor: '#ffffff', display: 'flex', padding: '15px 20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <button
            onClick={() => window.history.back()}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: '#333', fontSize: '14px', fontWeight: '600', background: 'none', border: 'none' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>돌아가기</span>
          </button>
        </div>

        {/* 타이머 카드 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', margin: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', margin: '0 0 15px 0' }}>⏱️ 노동 시간 측정</h2>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
              {isWorking ? '⏰ 측정 중' : isResting ? '☕ 휴식 중' : '⏸️ 대기 중'}
            </div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#6BA3D4', fontFamily: 'monospace', marginBottom: '15px' }}>
              {formatTime(currentTime)}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={handleStart}
                disabled={isWorking || isResting}
                style={{
                  flex: 1,
                  maxWidth: '100px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: isWorking || isResting ? 'not-allowed' : 'pointer',
                  backgroundColor: isWorking || isResting ? '#d1d5db' : '#6BA3D4',
                  color: '#ffffff',
                  boxShadow: isWorking || isResting ? 'none' : '0 2px 8px rgba(107, 163, 212, 0.3)',
                  transition: 'all 0.3s',
                  opacity: isWorking || isResting ? 0.5 : 1
                }}
              >
                시작
              </button>
              <button
                onClick={handleRest}
                disabled={!isWorking && !isResting}
                style={{
                  flex: 1,
                  maxWidth: '100px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: !isWorking && !isResting ? 'not-allowed' : 'pointer',
                  backgroundColor: !isWorking && !isResting ? '#d1d5db' : isResting ? '#10b981' : '#fbbf24',
                  color: '#ffffff',
                  boxShadow: !isWorking && !isResting ? 'none' : '0 2px 8px rgba(251, 191, 36, 0.3)',
                  transition: 'all 0.3s',
                  opacity: !isWorking && !isResting ? 0.5 : 1
                }}
              >
                {isResting ? '재개' : '휴식'}
              </button>
              <button
                onClick={handleStop}
                disabled={!isWorking && !isResting}
                style={{
                  flex: 1,
                  maxWidth: '100px',
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: !isWorking && !isResting ? 'not-allowed' : 'pointer',
                  backgroundColor: !isWorking && !isResting ? '#d1d5db' : '#ef4444',
                  color: '#ffffff',
                  boxShadow: !isWorking && !isResting ? 'none' : '0 2px 8px rgba(239, 68, 68, 0.3)',
                  transition: 'all 0.3s',
                  opacity: !isWorking && !isResting ? 0.5 : 1
                }}
              >
                종료
              </button>
            </div>
          </div>

          {/* 오늘의 기록 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: '#dbeafe', padding: '12px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#1e40af', marginBottom: '4px' }}>💼 노동 시간</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e40af' }}>
                {formatTime(todayWorkTime)}
              </div>
            </div>
            <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', color: '#92400e', marginBottom: '4px' }}>☕ 휴식 시간</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#92400e' }}>
                {formatTime(todayRestTime)}
              </div>
            </div>
          </div>
        </div>

        {/* 임금 계산 카드 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', margin: '0 20px 20px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', margin: 0 }}>💰 임금 계산</h2>
            <button
              onClick={() => setShowWageModal(true)}
              style={{ fontSize: '12px', color: '#6BA3D4', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              시급 설정
            </button>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>현재 시급</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>
              {hourlyWage.toLocaleString()}원
            </div>
          </div>

          <div style={{ backgroundColor: 'linear-gradient(135deg, #6BA3D4, #5a8cbd)', background: 'linear-gradient(135deg, #6BA3D4, #5a8cbd)', padding: '15px', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#ffffff', marginBottom: '4px', opacity: 0.9 }}>오늘 예상 임금</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff' }}>
              {calculateWage().toLocaleString()}원
            </div>
            <div style={{ fontSize: '11px', color: '#ffffff', marginTop: '4px', opacity: 0.8 }}>
              {(todayWorkTime / 1000 / 3600).toFixed(1)}시간 × {hourlyWage.toLocaleString()}원
              {(todayWorkTime / 1000 / 3600) > 8 && ` + 연장근로수당`}
            </div>
          </div>

          <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '10px', marginBottom: '12px' }}>
            <div style={{ fontSize: '11px', color: '#92400e', marginBottom: '6px' }}>📊 이번 달 예상 (20일 기준)</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>
              {stats.estimatedMonthlyWage.toLocaleString()}원
            </div>
            <div style={{ fontSize: '10px', color: '#92400e', opacity: 0.8 }}>
              총 {stats.estimatedMonthlyHours.toFixed(1)}시간
            </div>
          </div>

          {/* 상세 내역 */}
          <div style={{ backgroundColor: '#f8f9fa', padding: '12px', borderRadius: '10px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>💡 월 예상 임금 상세</div>
            <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.6' }}>
              • 기본급: {Math.floor(stats.estimatedMonthlyHours * hourlyWage).toLocaleString()}원<br/>
              • 연장근로수당: {stats.overtimeWage.toLocaleString()}원<br/>
              • 주휴수당: {stats.weeklyHolidayWage.toLocaleString()}원
              {stats.weeklyHolidayWage === 0 && <span style={{ color: '#ef4444' }}> (주 15시간 미만)</span>}
            </div>
          </div>
        </div>

        {/* 달력 카드 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', margin: '0 20px 20px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>📅 노동 스케줄</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            <button 
              onClick={previousMonth}
              style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: '700', color: '#333' }}
            >
              ‹
            </button>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#333' }}>
              {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
            </div>
            <button 
              onClick={nextMonth}
              style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: '700', color: '#333' }}
            >
              ›
            </button>
          </div>

          <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  {dayNames.map((day, index) => (
                    <th 
                      key={day} 
                      style={{ 
                        padding: '8px 4px', 
                        fontSize: '11px', 
                        fontWeight: '600',
                        color: index === 0 ? '#dc2626' : '#333'
                      }}
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
                        return <td key={dayObj.key} style={{ padding: '8px', height: '52px', backgroundColor: '#f9fafb' }}></td>;
                      }
                      return (
                        <td 
                          key={dayObj.key}
                          onClick={() => handleDateClick(dayObj.day)}
                          style={{
                            padding: '6px 4px',
                            height: '52px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            backgroundColor: '#ffffff',
                            transition: 'background-color 0.2s',
                            position: 'relative'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2px'
                          }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              fontSize: '13px',
                              fontWeight: dayObj.isToday ? '700' : '500',
                              color: dayObj.isToday ? '#ffffff' : dayObj.isSunday ? '#dc2626' : '#333',
                              backgroundColor: dayObj.isToday ? '#6BA3D4' : 'transparent'
                            }}>
                              {dayObj.day}
                            </span>
                            <div style={{ display: 'flex', gap: '3px', height: '6px' }}>
                              {dayObj.hasRecord && (
                                <div style={{ 
                                  width: '5px', 
                                  height: '5px', 
                                  borderRadius: '50%', 
                                  backgroundColor: '#10b981' 
                                }} />
                              )}
                              {dayObj.hasSchedule && (
                                <div style={{ 
                                  width: '5px', 
                                  height: '5px', 
                                  borderRadius: '50%', 
                                  backgroundColor: '#f59e0b' 
                                }} />
                              )}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>범례:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '11px' }}>근무기록</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span style={{ fontSize: '11px' }}>할일</span>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#999' }}>
              💡 날짜를 클릭하면 할 일을 추가할 수 있습니다
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', margin: '0 20px 20px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>📈 이번 달 통계</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>총 근무일</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>0일</div>
            </div>
            <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px' }}>평균 근무시간</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>0h</div>
            </div>
            <div style={{ backgroundColor: '#dbeafe', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#1e40af', marginBottom: '4px' }}>총 근무시간</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af' }}>0h</div>
            </div>
            <div style={{ backgroundColor: '#d1fae5', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#065f46', marginBottom: '4px' }}>총 임금</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#065f46' }}>0원</div>
            </div>
          </div>
        </div>

        {/* 시급 설정 모달 */}
        {showWageModal && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowWageModal(false)}
          >
            <div 
              style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                padding: '25px', 
                maxWidth: '350px', 
                width: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '15px' }}>시급 설정</h3>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                  시급 (원)
                </label>
                <input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '8px', 
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>
                  💡 2025년 최저시급: 9,860원
                </div>
              </div>
              <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '8px', marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#1e40af', marginBottom: '6px' }}>
                  📋 임금 계산 방법
                </div>
                <div style={{ fontSize: '10px', color: '#1e40af', lineHeight: '1.6' }}>
                  • 기본급 = 근무시간 × 시급<br/>
                  • 연장근로수당 = (8시간 초과) × 시급 × 1.5배<br/>
                  • 주휴수당 = 주 15시간 이상 근무 시 1일치 급여 추가
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowWageModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  취소
                </button>
                <button
                  onClick={() => setShowWageModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#6BA3D4',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(107, 163, 212, 0.3)'
                  }}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 할 일 추가 모달 */}
        {showScheduleModal && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowScheduleModal(false)}
          >
            <div 
              style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                padding: '25px', 
                maxWidth: '350px', 
                width: '100%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                📝 할 일 추가
              </h3>
              <div style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]} {selectedDate}일
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>
                  할 일
                </label>
                <textarea
                  value={scheduleInput}
                  onChange={(e) => setScheduleInput(e.target.value)}
                  placeholder="예: 오전 9시 출근, 점심시간 12시..."
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '8px', 
                    fontSize: '14px',
                    outline: 'none',
                    minHeight: '100px',
                    resize: 'vertical',
                    lineHeight: '1.5'
                  }}
                />
                <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>
                  💡 근무 시간, 해야 할 일 등을 자유롭게 적어보세요
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                {scheduleInput.trim() && (
                  <button
                    onClick={deleteSchedule}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '2px solid #ef4444',
                      backgroundColor: '#ffffff',
                      color: '#ef4444',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    삭제
                  </button>
                )}
                <button
                  onClick={() => setShowScheduleModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#333',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  취소
                </button>
                <button
                  onClick={saveSchedule}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#6BA3D4',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(107, 163, 212, 0.3)'
                  }}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
