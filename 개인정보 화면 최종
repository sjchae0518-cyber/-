import { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function ProfileInfo() {
  const [data, setData] = useState({
    koName: '',
    name: '',
    gender: '',
    nationality: '',
    residenceNumber: '',
    phone: '',
    currentEmployer: '',
    workLocation: '',
  });

  const [showGenderSelector, setShowGenderSelector] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#f0f0f0'}}>
      <div className="max-w-2xl mx-auto">
        {/* 돌아가기 버튼 박스 */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 inline-block">
          <button className="flex items-center gap-2 hover:opacity-80 text-gray-800">
            <ArrowLeft size={24} strokeWidth={3} />
            <span className="text-sm font-medium">돌아가기</span>
          </button>
        </div>

        {/* 메인 컨텐츠 박스 */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center mb-3">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={data.koName}
            onChange={(e) => handleChange('koName', e.target.value)}
            className="text-lg font-medium border-b-2 border-gray-300 pb-1 focus:outline-none focus:border-gray-800 bg-transparent"
            placeholder="한국어 이름"
          />
          <button 
            onClick={() => setShowGenderSelector(!showGenderSelector)}
            className="text-sm text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            {data.gender || '성별'}
          </button>
        </div>
        
        {/* Gender Selector Dropdown */}
        {showGenderSelector && (
          <div className="mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden z-10">
            <button
              onClick={() => {
                handleChange('gender', '남');
                setShowGenderSelector(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-200 transition-colors"
            >
              남
            </button>
            <button
              onClick={() => {
                handleChange('gender', '여');
                setShowGenderSelector(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-200 transition-colors"
            >
              여
            </button>
            <button
              onClick={() => {
                handleChange('gender', '선택 안 함');
                setShowGenderSelector(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              선택 안 함
            </button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* 영문이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">✍️ 영문이름</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
            placeholder="이름 입력"
          />
        </div>

        {/* 외국인번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🆔 외국인번호</label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength="6"
              className="w-24 border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
              placeholder="6자리"
            />
            <span className="pt-2">-</span>
            <input
              type="text"
              maxLength="7"
              className="flex-1 border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
              placeholder="7자리"
            />
          </div>
        </div>

        {/* 국적 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🌏 국적</label>
          <input
            type="text"
            value={data.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
            placeholder="국적 입력"
          />
        </div>

        {/* 휴대폰번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">📱 휴대폰번호</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
            placeholder="전화번호 입력"
          />
        </div>

        {/* 현사업주 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">👔 현사업주</label>
          <input
            type="text"
            value={data.currentEmployer}
            onChange={(e) => handleChange('currentEmployer', e.target.value)}
            className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
            placeholder="사업주 입력"
          />
        </div>

        {/* 현사업장 위치 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">📍 현사업장 위치</label>
          <input
            type="text"
            value={data.workLocation}
            onChange={(e) => handleChange('workLocation', e.target.value)}
            className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-gray-800"
            placeholder="사업장 위치 입력"
          />
        </div>

        {/* 권한설정 */}
        <div className="pt-4">
          <div className="flex items-center justify-between p-3 border-2 border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-700">⚙️ 권한설정</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
