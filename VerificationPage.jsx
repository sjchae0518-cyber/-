import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

export default function VerificationPage() {
  const [employerName, setEmployerName] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [currentOrganization, setCurrentOrganization] = useState('');
  const [workerSignature, setWorkerSignature] = useState('');
  const [employerSignature, setEmployerSignature] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [surveyType, setSurveyType] = useState(''); // 'worker' or 'employer'
  
  const employerCanvasRef = React.useRef(null);
  const workerCanvasRef = React.useRef(null);
  const [isDrawingEmployer, setIsDrawingEmployer] = useState(false);
  const [isDrawingWorker, setIsDrawingWorker] = useState(false);

  const bgColor = '#f0f0f0';
  const primaryColor = '#000000';

  const startDrawing = (canvasRef, setIsDrawing) => (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (canvasRef, isDrawing) => (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = (setIsDrawing) => () => {
    setIsDrawing(false);
  };

  const clearCanvas = (canvasRef) => () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  React.useEffect(() => {
    // Initialize canvases
    [employerCanvasRef, workerCanvasRef].forEach(ref => {
      if (ref.current) {
        const canvas = ref.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    });
  }, []);

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: bgColor}}>
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
        {/* 제목 */}
        <div className="mb-8">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-800 leading-relaxed">
              🔄 상호평가제는 근무지를 변경할 경우 필수적으로
              <br />
              실시해야 하는 사항입니다.
            </h1>
          </div>
          <p className="text-gray-600 ml-8">
            근무지 변경 여부 확인 절차 이후 이용 가능합니다.
            <br />
            <span className="ml-4">📝 다음 질문에 답해주십시오.</span>
          </p>
        </div>

        {/* 고용주 정보 */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="text-gray-700 font-medium block mb-2">고용주 이름</label>
            <input
              type="text"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium block mb-2">노동자 이름</label>
            <input
              type="text"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 font-medium block mb-2">현재 근무지 주소</label>
            <input
              type="text"
              value={currentOrganization}
              onChange={(e) => setCurrentOrganization(e.target.value)}
              className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
            />
          </div>

          <p className="text-gray-600 text-sm mb-4">📄 노동계약서 파일을 업로드 해주세요.</p>
          
          <div>
            <input
              type="file"
              id="fileUpload"
              accept=".pdf,.png,.jpg,.jpeg,.gif"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center w-full h-24 cursor-pointer"
            >
              {uploadedFile ? (
                <div className="text-center">
                  <p className="text-gray-700 font-medium">{uploadedFile.name}</p>
                  <p className="text-gray-500 text-sm">클릭하여 다른 파일 선택</p>
                </div>
              ) : (
                <>
                  <Plus size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">PDF, 이미지 파일 업로드</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* 전화번호 섹션 */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium block mb-2">📞 고용주 전화번호</label>
              <input
                type="text"
                value={employerSignature}
                onChange={(e) => setEmployerSignature(e.target.value)}
                className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                placeholder="전화번호"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium block mb-2">📞 노동자 전화번호</label>
              <input
                type="text"
                value={workerSignature}
                onChange={(e) => setWorkerSignature(e.target.value)}
                className="w-full bg-gray-100 rounded-xl outline-none px-4 py-3 focus:bg-gray-200 transition-colors"
                placeholder="전화번호"
              />
            </div>
          </div>
        </div>

        {/* 확인 문자 보내기 섹션 */}
        <div className="mb-8 p-5 rounded-2xl bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">💬 확인 문자 보내기</span>
            <span className="text-sm text-gray-500">(전송된 문자의 숫자를 입력해주세요)</span>
          </div>
          <input
            type="text"
            className="w-full bg-white rounded-xl outline-none px-4 py-3 border-2 border-gray-200 focus:border-gray-400 transition-colors"
            placeholder="인증번호 입력"
          />
        </div>

        {/* 공지 메시지 */}
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            ✨ 근무지 변경이 사실이라면 아래 서명하시오.
          </p>
        </div>

        {/* 증명 박스들 */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 font-medium">고용주</label>
                <button
                  onClick={clearCanvas(employerCanvasRef)}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  지우기
                </button>
              </div>
              <canvas
                ref={employerCanvasRef}
                onMouseDown={startDrawing(employerCanvasRef, setIsDrawingEmployer)}
                onMouseMove={draw(employerCanvasRef, isDrawingEmployer)}
                onMouseUp={stopDrawing(setIsDrawingEmployer)}
                onMouseLeave={stopDrawing(setIsDrawingEmployer)}
                className="border-2 border-gray-300 rounded-2xl w-full h-40 bg-white cursor-crosshair"
                style={{ touchAction: 'none' }}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 font-medium">노동자</label>
                <button
                  onClick={clearCanvas(workerCanvasRef)}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  지우기
                </button>
              </div>
              <canvas
                ref={workerCanvasRef}
                onMouseDown={startDrawing(workerCanvasRef, setIsDrawingWorker)}
                onMouseMove={draw(workerCanvasRef, isDrawingWorker)}
                onMouseUp={stopDrawing(setIsDrawingWorker)}
                onMouseLeave={stopDrawing(setIsDrawingWorker)}
                className="border-2 border-gray-300 rounded-2xl w-full h-40 bg-white cursor-crosshair"
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-gray-100 text-gray-700 font-medium transition-colors">
              확인
            </button>
          </div>
        </div>

        {/* 설문 타입 선택 */}
        <div className="mb-8">
          <p className="text-gray-700 font-medium mb-4 text-center">설문 유형을 선택해주세요</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSurveyType('worker')}
              className={`p-4 rounded-2xl border-2 font-medium transition-all ${
                surveyType === 'worker'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              노동자 설문하기
            </button>
            <button
              onClick={() => setSurveyType('employer')}
              className={`p-4 rounded-2xl border-2 font-medium transition-all ${
                surveyType === 'employer'
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              고용주 설문하기
            </button>
          </div>
        </div>

        {/* 다음 버튼 */}
        <div className="flex justify-center">
          <button 
            disabled={!surveyType}
            className={`px-10 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg transition-all ${
              surveyType
                ? 'bg-black text-white hover:opacity-90 hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음
            <span>→</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
