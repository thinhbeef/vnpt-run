# VNPT SERVICE RUN 🏃‍♂️⚡

Game 2D casual runner kết hợp mini-game trắc nghiệm nghiệp vụ số dành cho nhân viên và khách hàng trải nghiệm hệ sinh thái số VNPT.

---

## 🎮 Gameplay Loop

```
RUN → AVOID OBSTACLE → SERVICE STATION → MINI GAME / QUIZ → COMPLETE → CONTINUE → FINISH
```

* **RUN**: Nhân viên VNPT tự động di chuyển từ trái sang phải qua các cung đường văn phòng, đô thị thông minh, và chính quyền số.
* **AVOID OBSTACLES**: Dùng phím nhảy/trượt để né các chướng ngại vật (thùng cáp quang, nón công trình, rào chắn, rãnh cáp).
* **SERVICE STATION**: Dừng chân tại các trạm dịch vụ số VNPT (VNPT WiFi, FiberVNN, VinaPhone, iOffice, iLIS, Hóa đơn điện tử, Chữ ký số SmartCA, VNPT Cloud, Chính quyền số eGov).
* **MINI GAME / QUIZ**: Trả lời câu hỏi nghiệp vụ số để nhận điểm (+100 điểm, combo x2, x3...), hồi sức và mở khóa trạm.
* **FINISH & LEVEL COMPLETE**: Vượt qua tất cả các trạm và về đích an toàn để mở khóa level tiếp theo.

---

## 🕹️ Phím điều khiển (Controls)

### Trên máy tính (Desktop):
* **Nhảy (Jump)**: `Arrow Up` / `W` / `SPACE`
* **Trượt (Slide)**: `Arrow Down` / `S`
* **Tạm dừng (Pause)**: `ESC`

### Trên điện thoại / Máy tính bảng (Mobile):
* **Nút Nhảy**: Chạm nút tròn "NHẢY" bên góc phải màn hình
* **Nút Trượt**: Nhấn giữ nút "TRƯỢT" bên góc trái màn hình

---

## 📁 Cấu trúc Project (Architecture)

```
vnpt-service-run/
├── data/ (public/data/)
│   ├── questions.json     # Ngân hàng câu hỏi trắc nghiệm dịch vụ VNPT
│   ├── services.json      # Danh mục dịch vụ số & bảng màu nhận diện
│   └── levels.json        # Cấu hình 3 màn chơi và độ khó
├── src/
│   ├── types.ts           # Định nghĩa TypeScript GameState, Player, Station, Quiz...
│   ├── data/              # Typed datasets cho Services, Questions, Levels
│   ├── game/
│   │   ├── player.ts      # Nhân vật nhân viên VNPT, physics, animation poses & particles
│   │   ├── obstacle.ts    # Hệ thống vật cản (box, cone, barrier, pothole, sign)
│   │   ├── station.ts     # Trạm dịch vụ số Kiosk Kỹ thuật số VNPT
│   │   ├── camera.ts      # Horizontal scrolling camera follow
│   │   ├── renderer.ts    # Parallax background 4 lớp (sky, city towers, street, road)
│   │   ├── collision.ts   # AABB collision forgiveness padding
│   │   ├── audio.ts       # Web Audio API Synthesizer (100% offline, zero external sound files)
│   │   └── storage.ts     # LocalStorage persistence (high score, levels, achievements)
│   ├── components/
│   │   ├── GameCanvas.tsx # 60 FPS HTML5 Canvas engine
│   │   ├── HUD.tsx        # Thanh trạng thái (HP tim, Score, Combo, Level, Mute/Pause)
│   │   ├── MainMenu.tsx   # Menu chính trò chơi
│   │   ├── ServiceStationModal.tsx # Kiosk tương tác & Quiz thử thách
│   │   ├── BossChallengeModal.tsx  # Thử thách chuyển đổi số liên hoàn cuối màn 3
│   │   ├── GameOverModal.tsx       # Màn hình hết máu & chơi lại
│   │   ├── LevelCompleteModal.tsx  # Màn hình chúc mừng qua màn
│   │   ├── VictoryModal.tsx        # Huân chương quán quân
│   │   ├── HowToPlayModal.tsx      # Hướng dẫn luật chơi
│   │   ├── ServicesModal.tsx       # Tra cứu hệ sinh thái 9 dịch vụ số VNPT
│   │   ├── AchievementsModal.tsx   # Danh hiệu & thành tích
│   │   └── SettingsModal.tsx       # Cài đặt âm thanh & Reset dữ liệu
│   ├── App.tsx            # State Machine điều phối toàn bộ game
│   └── main.tsx           # Entry point
├── index.html
├── metadata.json
└── README.md
```

---

## 🚀 Hướng dẫn chạy (Run Instructions)

Dự án có thể chạy trực tiếp trên môi trường web Vite hoặc mở local:

```bash
# Cài đặt và khởi chạy với Vite
npm install
npm run dev

# Hoặc build production
npm run build
```

Nếu muốn chạy static server thuần túy (không cần Node.js sau khi build):
```bash
python -m http.server 3000
```
Mở trình duyệt truy cập: `http://localhost:3000`

---

## 🏆 Tính năng Phase 1 Đã Hoàn Thành
- [x] Main menu đầy đủ tính năng: Play, How to play, Services, Achievements, Settings.
- [x] Nhân vật nhân viên VNPT trang phục áo xanh nhận diện `#0066cc`, thẻ nhân viên ID badge, nón bảo hộ/cap.
- [x] Animation chạy, nhảy, trượt (crouch/slide), chớp nháy khi bị thương (hurt blink), bụi chạy hạt particle.
- [x] Hệ thống vật cản: Thùng cáp quang, nón chóp công trình, rào chắn barie, hố cáp ngầm, biển báo.
- [x] Va chạm AABB công bằng, tính điểm né chướng ngại vật (+10 điểm).
- [x] Trạm dịch vụ Kiosk số VNPT (Service Station) phát sóng, tự động tương tác khi nhân vật đến trạm.
- [x] Mini-game Quiz trắc nghiệm 4 lựa chọn, phản hồi đúng/sai, giải thích kiến thức, thưởng điểm +100 & Combo.
- [x] Hệ thống 3 Level hoàn chỉnh: Văn phòng VNPT (Level 1), Đô thị số (Level 2), Chính quyền số (Level 3).
- [x] Boss Final Challenge ở Level 3 với chuỗi 3 câu hỏi đỉnh cao chuyển đổi số.
- [x] HUD đầy đủ: 3 tim máu (HP), Score, Combo multiplier, Progress bar theo dõi tiến độ về đích.
- [x] Âm thanh Web Audio API offline tổng hợp: Nhảy, Hurt, Ting trạm, Đúng, Sai, Hoàn thành level, Nhạc nền chiptune.
- [x] Lưu trữ offline bằng localStorage (High score, unlocked level, achievements).
