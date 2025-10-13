import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

export default function VerificationPage() {
  const [employerName, setEmployerName] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [workerSignature, setWorkerSignature] = useState('');
  const [employerSignature, setEmployerSignature] = useState('');

  const bgColor = '#f0f0f0';
  const primaryColor = '#6BA3D4';

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: bgColor}}>
      {/* 돌아가기 버튼 */}
      <button className="flex items-center gap-2 mb-6 hover:opacity-80" style={{color: primaryColor}}>
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">돌아가기</span>
      </button>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* 제목 */}
        <div className="mb-8">
          <div className="flex items-start gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-800">✕</span>
            <h1 className="text-xl font-bold text-gray-800 leading-relaxed">
              상호평가제는 근무지를 변경할 경우 필수적으로
              <br />
              실시해야 하는 사항입니다.
            </h1>
          </div>
          <p className="text-gray-600 ml-8">
            → 근무지 변경 여부 확인 절차 이후 이용 가능합니다.
            <br />
            <span className="ml-4">다음 질문에 답해주십시오.</span>
          </p>
        </div>

        {/* 고용주 정보 */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700 font-medium whitespace-nowrap">고용주 이름</label>
            <input
              type="text"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              className="flex-1 border-b-2 outline-none px-2 py-1"
              style={{borderBottomColor: primaryColor}}
            />
            <span className="font-medium" style={{color: primaryColor}}>오동각색</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700 font-medium whitespace-nowrap">노동자 이름</label>
            <input
              type="text"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              className="flex-1 border-b-2 outline-none px-2 py-1"
              style={{borderBottomColor: primaryColor}}
            />
            <span className="font-medium" style={{color: primaryColor}}>오동각색</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700 font-medium whitespace-nowrap">현재 근무지 주소</label>
            <input
              type="text"
              value={currentOrganization}
              onChange={(e) => setCurrentOrganization(e.target.value)}
              className="flex-1 border-b-2 outline-none px-2 py-1"
              style={{borderBottomColor: primaryColor}}
            />
          </div>

          <p className="text-gray-600 text-sm mb-4">노동계약서 파일을 업로드 해주세요.</p>
          
          <button 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center w-20 h-20"
          >
            <Plus size={32} className="text-gray-400" />
          </button>
        </div>

        {/* 서명 섹션 */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700 font-medium whitespace-nowrap">고용주</label>
            <input
              type="text"
              value={employerSignature}
              onChange={(e) => setEmployerSignature(e.target.value)}
              className="flex-1 border-b-2 outline-none px-2 py-1"
              style={{borderBottomColor: primaryColor}}
              placeholder="서명"
            />
            <label className="text-gray-700 font-medium whitespace-nowrap">노동자</label>
            <input
              type="text"
              value={workerSignature}
              onChange={(e) => setWorkerSignature(e.target.value)}
              className="flex-1 border-b-2 outline-none px-2 py-1"
              style={{borderBottomColor: primaryColor}}
              placeholder="서명"
            />
          </div>
        </div>

        {/* 확인 문자 보내기 섹션 */}
        <div className="mb-8 p-4 border-2 rounded" style={{borderColor: primaryColor}}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">확인 문자 보내기</span>
            <span className="text-sm text-gray-500">(전송된 문자의 숫자를 입력해주세요)</span>
          </div>
        </div>

        {/* 공지 메시지 */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <p className="text-gray-700 text-sm leading-relaxed">
            근저자료 변경이 사실이라면 아래 서류을 해 작성시오.
          </p>
        </div>

        {/* 증명 박스들 */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium block mb-2">고용주</label>
              <div className="border-2 border-gray-300 rounded h-40 bg-white"></div>
            </div>
            <div>
              <label className="text-gray-700 font-medium block mb-2">노동자</label>
              <div className="border-2 border-gray-300 rounded h-40 bg-white"></div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="px-4 py-2 border-2 border-gray-300 rounded hover:bg-gray-50 text-gray-700 font-medium">
              확인
            </button>
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <div className="text-sm text-gray-600 leading-relaxed mb-6">
          <p>
            노동자 쪽은 이 캡쳐의 다음 페이지에서, 고용주는 진화번호로 해당정보를 
            받습니다. 성실성정, 씨왜의 입력합시오.
          </p>
        </div>

        {/* 다음 버튼 */}
        <div className="flex justify-center">
          <button className="text-white px-8 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90" style={{backgroundColor: primaryColor}}>
            다음
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}