function createAt() {
  let date = new Date()
  let time = date.toLocaleString()
  return time
}
const firebaseConfig = {
  apiKey: 'AIzaSyCFGVHQxjx1VHGJPr7p04pJYT2V9qSgBWE',
  authDomain: 'sparta-b3aff.firebaseapp.com',
  projectId: 'sparta-b3aff',
  storageBucket: 'sparta-b3aff.appspot.com',
  messagingSenderId: '170544802639',
  appId: '1:170544802639:web:a1aaafc9f25bde5a5d733a',
  measurementId: 'G-9FNSVJPZX2',
}

firebase.initializeApp(firebaseConfig)
database = firebase.firestore()

// posting toggle

$('#postingbox').hide()

$('#postingbtn').click(async function () {
  $('#postingbox').toggle()
})

// 공부 데이터 가져오기
const docRef = database
  .collection('study-log')
  .orderBy('createdAt', 'desc')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      let id = doc.id
      let date = data.date
      let goal = data.goal
      let achievement = data.achievement
      let link = data.link
      let etc = data.etc
      let understanding = data.understanding

      let temp_html = `
          <tr data-documentId=${id} data-collectionName="study-log">
              <td>${date}</td>
              <td>${goal}</td>
              <td>${achievement}</td>
              <td>${link}</td>
              <td>${etc}</td>
              <td>${understanding}</td>
              <td><button class="edit">edit</button></td>
              <td><button class="del">del</button></td>
          </tr>
          `
      $('#table').append(temp_html)
    })
    // 수정

    const editComment = document.querySelectorAll('.edit')
    editComment.forEach((ele) => {
      ele.addEventListener('click', async (e) => {
        // edit 버튼 클릭
        // 수정창 팝업됨
        $('#editPopup').css({
          top:
            ($(window).height() - $('#editPopup').outerHeight()) / 2 +
            $(window).scrollTop() +
            'px',
          left:
            ($(window).width() - $('#editPopup').outerWidth()) / 2 +
            $(window).scrollLeft() +
            'px',
        })
        $('#editPopup_mask').css('display', 'block')
        $('#editPopup').css('display', 'block')
        $('body').css('overflow', 'hidden')

        let id = e.target.closest('tr').dataset.documentid
        let editLog = database.collection('study-log').doc(id)
        editLog.get().then((doc) => {
          let data = doc.data()
          let date = data.date
          let goal = data.goal
          let achievement = data.achievement
          let link = data.link
          let etc = data.etc
          let understanding = data.understanding

          $('#edit-date').val(date)
          $('#edit-goal').text(goal)
          $('#edit-achievement').text(achievement)
          $('#edit-link').text(link)
          $('#edit-etc').text(etc)
          $('#edit-understanding').val(understanding)

          $('.edit-submit').click(function (event) {
            var editRef = database.collection('study-log').doc(id)
            return editRef
              .update({
                date: $('#edit-date').val(),
                goal: $('#edit-goal').val(),
                achievement: $('#edit-achievement').val(),
                link: $('#edit-link').val(),
                etc: $('#edit-etc').val(),
                understanding: $('#edit-understanding').val(),
              })
              .then(() => {
                console.log('수정완료!')
                window.location.reload()
              })
              .catch((error) => {
                console.error('에러: ', error)
              })
          })
        })
      })
    })
    // 닫기 버튼 클릭시
    $('#close').click(function (event) {
      $('#editPopup_mask').css('display', 'none')
      $('#editPopup').css('display', 'none')
      $('body').css('overflow', 'auto')
    })

    // 데이터 삭제

    const deleteLog = document.querySelectorAll('.del')
    deleteLog.forEach((ele) => {
      ele.addEventListener('click', async (e) => {
        let id = e.target.closest('tr').dataset.documentid
        let password = prompt('비밀번호 입력')
        if (password == 4646) {
          database
            .collection('study-log')
            .doc(id)
            .delete()
            .then(() => {
              window.location.reload() // 페이지 새로고침
            })
            .catch((error) => {
              console.error('에러: ', error)
            })
        }
      })
    })
  })

// 공부 데이터 저장
$('#submit').click(async function () {
  let date = $('#date').val()
  let goal = $('#goal').val()
  let achievement = $('#achievement').val()
  let link = $('#link').val()
  let etc = $('#etc').val()
  let understanding = $('#understanding').val()
  let createdAt = createAt()

  database
    .collection('study-log')
    .add({
      date,
      goal,
      achievement,
      link,
      etc,
      understanding,
      createdAt,
    })
    .then(() => {
      console.log('성공')
      alert('저장되었습니다.')
      window.location.reload()
    })
    .catch((error) => {
      console.error('실패')
    })
})
