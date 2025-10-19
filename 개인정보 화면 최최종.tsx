import { useState } from 'react';

export default function ProfileInfo() {
  const [data, setData] = useState({
    koName: '',
    name: '',
    gender: '',
    nationality: '',
    residenceNumber1: '',
    residenceNumber2: '',
    phone: '',
    currentEmployer: '',
    workLocation: '',
  });

  const [showGenderSelector, setShowGenderSelector] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

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

        {/* 프로필 카드 */}
        <div style={{ backgroundColor: '#ffffff', padding: '20px', margin: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '90px', 
              height: '90px', 
              borderRadius: '50%', 
              border: '4px solid #6BA3D4', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 12px auto',
              backgroundColor: '#f3f4f6'
            }}>
              <svg style={{ width: '50px', height: '50px', color: '#6BA3D4' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={data.koName}
                onChange={(e) => handleChange('koName', e.target.value)}
                style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  borderBottom: '2px solid #6BA3D4', 
                  paddingBottom: '4px', 
                  outline: 'none', 
                  backgroundColor: 'transparent',
                  textAlign: 'center',
                  width: '140px',
                  border: 'none',
                  borderBottom: '2px solid #6BA3D4'
                }}
                placeholder="한국어 이름"
              />
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowGenderSelector(!showGenderSelector)}
                  style={{ 
                    fontSize: '13px', 
                    color: '#333', 
                    padding: '6px 14px', 
                    border: '2px solid #6BA3D4', 
                    borderRadius: '20px', 
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                >
                  {data.gender || '성별'}
                </button>
                
                {showGenderSelector && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '40px', 
                    left: '0', 
                    backgroundColor: 'white', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '10px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                    overflow: 'hidden', 
                    zIndex: 10,
                    minWidth: '100px'
                  }}>
                    <button
                      onClick={() => {
                        handleChange('gender', '남');
                        setShowGenderSelector(false);
                      }}
                      style={{ 
                        width: '100%', 
                        padding: '10px 16px', 
                        textAlign: 'left', 
                        border: 'none', 
                        borderBottom: '1px solid #e5e7eb', 
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      남
                    </button>
                    <button
                      onClick={() => {
                        handleChange('gender', '여');
                        setShowGenderSelector(false);
                      }}
                      style={{ 
                        width: '100%', 
                        padding: '10px 16px', 
                        textAlign: 'left', 
                        border: 'none', 
                        borderBottom: '1px solid #e5e7eb', 
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      여
                    </button>
                    <button
                      onClick={() => {
                        handleChange('gender', '선택 안 함');
                        setShowGenderSelector(false);
                      }}
                      style={{ 
                        width: '100%', 
                        padding: '10px 16px', 
                        textAlign: 'left', 
                        border: 'none', 
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      선택 안 함
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 입력 필드들 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 영문이름 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                ✍️ 영문이름
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  padding: '10px 12px', 
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="영문 이름 입력"
              />
            </div>

            {/* 외국인번호 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                🆔 외국인번호
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  maxLength="6"
                  value={data.residenceNumber1}
                  onChange={(e) => handleChange('residenceNumber1', e.target.value)}
                  style={{ 
                    width: '90px', 
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    padding: '10px 12px', 
                    fontSize: '14px',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                  placeholder="6자리"
                />
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#666' }}>-</span>
                <input
                  type="text"
                  maxLength="7"
                  value={data.residenceNumber2}
                  onChange={(e) => handleChange('residenceNumber2', e.target.value)}
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    padding: '10px 12px', 
                    fontSize: '14px',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                  placeholder="7자리"
                />
              </div>
            </div>

            {/* 국적 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                🌏 국적
              </label>
              <input
                type="text"
                value={data.nationality}
                onChange={(e) => handleChange('nationality', e.target.value)}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  padding: '10px 12px', 
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="국적 입력"
              />
            </div>

            {/* 휴대폰번호 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                📱 휴대폰번호
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  padding: '10px 12px', 
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="전화번호 입력"
              />
            </div>

            {/* 현사업주 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                👔 현사업주
              </label>
              <input
                type="text"
                value={data.currentEmployer}
                onChange={(e) => handleChange('currentEmployer', e.target.value)}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  padding: '10px 12px', 
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="사업주 입력"
              />
            </div>

            {/* 현사업장 위치 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                📍 현사업장 위치
              </label>
              <input
                type="text"
                value={data.workLocation}
                onChange={(e) => handleChange('workLocation', e.target.value)}
                style={{ 
                  width: '100%', 
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  padding: '10px 12px', 
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="사업장 위치 입력"
              />
            </div>
          </div>
        </div>

        {/* 권한 설정 버튼 */}
        <div style={{ padding: '0 20px' }}>
          <button
            style={{ 
              width: '100%',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 20px', 
              border: '2px solid #6BA3D4', 
              borderRadius: '12px', 
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.3s'
            }}
          >
            <span style={{ fontWeight: '600', color: '#333', fontSize: '15px' }}>⚙️ 권한설정</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', color: '#6BA3D4' }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* 저장 버튼 */}
        <div style={{ padding: '20px' }}>
          <button
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#6BA3D4',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(107, 163, 212, 0.3)',
              transition: 'all 0.3s'
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
