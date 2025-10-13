import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DormitoryInfo() {
  const [selectedAction, setSelectedAction] = useState('info');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    foreignId: '',
    email: '',
    currentWorkplace: '',
    employer: '',
    employerPhone: '',
    dormitory: ''
  });
  const bgColor = '#f0f0f0';

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('신청서 제출:', formData);
    alert('기숙사 신청이 완료되었습니다!');
  };

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: bgColor}}>
      <div className="max-w-4xl mx-auto">
        {/* 돌아가기 버튼 박스 */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 inline-block">
          <button className="flex items-center gap-2 hover:opacity-80 text-gray-800">
            <ArrowLeft size={24} strokeWidth={3} />
            <span className="text-sm font-medium">돌아가기</span>
          </button>
        </div>

        {/* 기숙사 옵션 선택 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setSelectedAction('info')}
            className={`p-4 rounded-2xl border-2 font-medium transition-all shadow-md ${
              selectedAction === 'info'
                ? 'bg-gray-900 text-white border-gray-900 shadow-xl'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-lg'
            }`}
          >
            📋 기숙사 정보 찾기
          </button>
          <button
            onClick={() => setSelectedAction('apply')}
            className={`p-4 rounded-2xl border-2 font-medium transition-all shadow-md ${
              selectedAction === 'apply'
                ? 'bg-gray-900 text-white border-gray-900 shadow-xl'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-lg'
            }`}
          >
            ✍️ 기숙사 신청하기
          </button>
        </div>

        {/* 기숙사 정보 표시 (정보 찾기 선택 시) */}
        {selectedAction === 'info' && (
          <>
        {/* 충남 청양군 기숙사 */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">📍 충남 청양군 기숙사</h2>
            <div className="h-1 w-full bg-gray-800 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">👥 대상자</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                외국인 계절근로자 전용<br/><br/>
                현재 라오스 출신 공공형 계절근로자 약 30명 거주 중
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">🏢 수용 규모</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                지상 2층, 연면적 약 775㎡<br/><br/>
                총 34명 수용 가능 (4인실 8개, 1인실 2개)
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">✨ 시설 및 편의</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                • 공용 주방, 세탁실, 관리실<br/>
                • 세탁기, 건조기, 냉장고, 에어컨<br/>
                • 개별 욕실 완비
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">💰 비용 및 거주 기간</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                보증금: 30만 원<br/>
                월세: 30만 원<br/>
                최대 거주 기간: 8개월
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5">
            <div className="font-bold text-gray-800 mb-2">📚 추가 지원 프로그램</div>
            <div className="text-sm text-gray-700">
              실용 회화 중심의 무료 한국어 교육 제공 (입주자 및 군내 외국인 근로자 모두 대상)
            </div>
          </div>
        </div>

        {/* 전북 고창 기숙사 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">📍 전북 고창 기숙사</h2>
            <div className="h-1 w-full bg-gray-800 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">👥 대상자</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                고창군 소재 농업인 또는 농업법인·조합에 고용된 외국인 농업근로자
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">🏢 수용 규모</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                지상 4층, 총 면적 약 950㎡<br/><br/>
                총 48명 수용 가능 (2인실)
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">🏗️ 시설 구성</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                • 1층: 공동 취사장, 샤워실, 세탁실, 다목적실<br/>
                • 2~4층: 2인실 숙소
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">🛡️ 편의시설 및 안전</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                • 각 방: 에어컨, CCTV 설치<br/>
                • 공용 취사장: 인덕션, 냉장고, 밥솥, 정수기<br/>
                • 외부 세척장, 사물함 완비
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">💰 비용 및 거주 기간</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                이용료: 월 20만 원<br/>
                부식비: 월 5만 원<br/>
                보증금: 30만 원<br/>
                최대 거주 기간: 8개월
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
              <div className="text-xs font-bold text-gray-600 mb-2 uppercase">🤝 기타 지원</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                • 통역, 고충 상담, 근태 관리<br/>
                • 인력 수급 연결<br/>
                • 원콜 예약 서비스
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
            <div className="font-bold text-gray-800 mb-2">🌟 전담 체계 운영</div>
            <div className="text-sm text-gray-700">
              고창군에서 외국인 근로자의 생활 적응을 지원하기 위한 전담 체계를 운영하고 있습니다.
            </div>
          </div>
        </div>
        </>
        )}

        {/* 기숙사 신청 폼 (신청하기 선택 시) */}
        {selectedAction === 'apply' && (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">✍️ 기숙사 신청서</h2>
            
            <div className="space-y-5">
              {/* 성명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">👤 성명</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="이름을 입력하세요"
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📱 전화번호</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="전화번호를 입력하세요"
                />
              </div>

              {/* 외국인 번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🆔 외국인 번호</label>
                <input
                  type="text"
                  value={formData.foreignId}
                  onChange={(e) => handleInputChange('foreignId', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="외국인 번호를 입력하세요"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📧 이메일</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              {/* 현작업장 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">🏭 현작업장</label>
                <input
                  type="text"
                  value={formData.currentWorkplace}
                  onChange={(e) => handleInputChange('currentWorkplace', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="현재 작업장을 입력하세요"
                />
              </div>

              {/* 고용주 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">👔 고용주</label>
                <input
                  type="text"
                  value={formData.employer}
                  onChange={(e) => handleInputChange('employer', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="고용주 이름을 입력하세요"
                />
              </div>

              {/* 고용주 전화번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📞 고용주 전화번호</label>
                <input
                  type="tel"
                  value={formData.employerPhone}
                  onChange={(e) => handleInputChange('employerPhone', e.target.value)}
                  className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                  placeholder="고용주 전화번호를 입력하세요"
                />
              </div>

              {/* 신청 기숙사 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">🏠 신청 기숙사 선택</label>
                <div className="space-y-3">
                  <button
                    onClick={() => handleInputChange('dormitory', '충남 청양군')}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.dormitory === '충남 청양군'
                        ? 'border-black'
                        : 'border-gray-400'
                    }`}>
                      {formData.dormitory === '충남 청양군' && (
                        <div className="w-3.5 h-3.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">충남 청양군</span>
                  </button>
                  <button
                    onClick={() => handleInputChange('dormitory', '전북 고창')}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.dormitory === '전북 고창'
                        ? 'border-black'
                        : 'border-gray-400'
                    }`}>
                      {formData.dormitory === '전북 고창' && (
                        <div className="w-3.5 h-3.5 rounded-full bg-black"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">전북 고창</span>
                  </button>
                </div>
              </div>

              {/* 제출하기 버튼 */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  제출하기 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 text-gray-500 text-sm">
          © 외국인 근로자 지원 센터
        </div>
      </div>
    </div>
  );
}
