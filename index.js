// Firebase SDK 라이브러리 가져오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCFGVHQxjx1VHGJPr7p04pJYT2V9qSgBWE',
  authDomain: 'sparta-b3aff.firebaseapp.com',
  projectId: 'sparta-b3aff',
  storageBucket: 'sparta-b3aff.appspot.com',
  messagingSenderId: '170544802639',
  appId: '1:170544802639:web:a1aaafc9f25bde5a5d733a',
  measurementId: 'G-9FNSVJPZX2',
}

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// posting toggle

$('#postingbox').hide()

$('#postingbtn').click(async function () {
  $('#postingbox').toggle()
})

// 공부 데이터 저장
$('#submit').click(async function () {
  let date = $('#date').val()
  let goal = $('#goal').val()
  let achievement = $('#achievement').val()
  let link = $('#link').val()
  let etc = $('#etc').val()
  let understanding = $('#understanding').val()

  let doc = {
    date: date,
    goal: goal,
    achievement: achievement,
    link: link,
    etc: etc,
    understanding: understanding,
  }

  await addDoc(collection(db, 'study-log'), doc)
  alert('저장되었습니다.')
  console.log(doc)
  //window.location.reload()
})

// 공부 데이터 가져오기
let docs = await getDocs(collection(db, 'study-log'))
docs.forEach((doc) => {
  let data = doc.data()

  let date = data.date
  let goal = data.goal
  let achievement = data.achievement
  let link = data.link
  let etc = data.etc
  let understanding = data.understanding

  let temp_html = `
        <tr><td class="space"></td></tr>
        <tr>
            <td>${date}</td>
            <td>${goal}</td>
            <td>${achievement}</td>
            <td>${link}</td>
            <td>${etc}</td>
            <td>${understanding}</td>
        </tr>
        `
  $('#table').append(temp_html)
})
