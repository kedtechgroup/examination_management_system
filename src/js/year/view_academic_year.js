$(document).ready(() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const year_id = urlParams.get("year_id");

  const all_exams_this_year = $("#all_exams_this_year");

  //Form holding the year inputs
  const year_form = $("#year_form");

  // Edit Year button to modify the years details.
  const edit_academic_year = $("#edit_academic_year");

  //
  const term_name = $("#term_name");

  // data fetched through ajax call for the term year table.

  // Constructor method that populates everything.
  const init = () => {
    $.ajax({
      url: "../queries/get_year_details.php",
      data: {
        year_id: year_id,
      },
      type: "GET",
    }).done((response) => {
      const arr = JSON.parse(response);
      arr.forEach((items) => {
        $("#year_title").append(`Academic Year - ${items.year_name}`);
        $("#heading").html(`Academic Year ~ ${items.year_name}`);
        $("#bread_list").html(`${items.year_name}`);
        edit_academic_year.html(`Edit Academic Year`);

        const alert = $("#alert").html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>View Year ${items.year_name} and its terms. All the terms performance for the year ${items.year_name} in the school are defined on the table below.</strong>
            <hr>
              <p class="mb-0">Click on edit Academic year to modify or click on one of the terms 
                to view more details and the performance</p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
        `);
      });
    });
  };

  init();

  // Function to get the terms
  const get_terms = () => {
    $.ajax({
      url: "../queries/get_academic_terms.php",
      type: "GET",
    }).done((resp) => {
      const arr = JSON.parse(resp);

      if (arr.length == 0) {
        $("#card_alert")
          .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Terms have not yet been added. </strong>
        <hr>
          <p class="mb-0">Please add terms to proceed</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>`);

        $("#form_submit").prop(`disable`);
      }

      arr.forEach((item) => {
        term_name.append(`<option value="${item.id}">${item.name}</option>`);
      });
    });
  };

  get_terms();

  year_form.submit((event) => {
    const formData = {
      year_id: year_id,
      term_id: term_name.val(),
    };
    $.ajax({
      url: "../queries/add_term_to_year.php",
      type: "GET",
      dataSrc: "",
      data: formData,
    }).done((resp) => {
      const arr = JSON.parse(resp);
      if (arr.success == true) {
        iziToast.success({
          type: "Success",
          position: "topRight",
          transitionIn: "bounceInLeft",
          message: arr.message,
          onClosing: () => {
            term_year_table.ajax.reload(null, false);
          },
        });
      } else {
        iziToast.error({
          type: "Error",
          position: "topRight",
          transitionIn: "bounceInLeft",
          message: arr.message,
        });
      }
    });

    event.preventDefault();
  });

  const formData = {
    year_id: year_id,
  };

  const term_year_table = $("#term_year_table").DataTable({
    ajax: {
      url: "./../queries/get_view_academic_year_terms.php",
      dataSrc: "",
      type: "GET",
      data: formData,
    },
    columnDefs: [
      {
        targets: 1,
        data: {
          name: "name",
          term_year_id: "term_year_id",
        },
        render: (data) => {
          return `<a href="./view_academic_year_term_performance?term_id=${data.term_year_id}&year_id=${year_id}">${data.name}</a>`;
        },
      },
      {
        targets: 0,
        data: "created_at",
      },
      {
        targets: 2,
        data: "created_by",
      },
      {
        targets: 3,
        data: "id",
        render: (data) => {
          return `<div><span><i class="fas fa-trash text-danger"></i></span></div>`;
        },
      },
    ],
  });

  const class_end_year_table = $("#class_end_year_table").DataTable({
    ajax: {
      url: "./../queries/fetch_class_end_year_result.php",
      dataSrc: "",
      type: "GET",
      data: formData,
    },
    columnDefs: [
      {
        targets: 0,
        data: "ClassName",
        render: function (data) {
          return `<a href="./view_class_academic_year_performance.php?class_name=${data}&academic_year=${year_id}">${data}</a>`;
        },
      },
      {
        targets: 1,
        data: "ClassNameNumeric",
      },
      {
        targets: 2,
        data: "name",
      },
      {
        targets: 3,
        data: "class_result",
        render: function (data) {
          if (data === null) {
            return "0";
          } else {
            return `${data}`;
          }
        },
      },
    ],
  });

  function get_all_exams_this_year() {
    $.ajax({
      url: "/utils/get_all_exams_this_year.php",
      type: "GET",
      data: {
        year_id: year_id,
      },
    }).done(function (response) {
      const j = JSON.parse(response);
      j.forEach((item) => {
        all_exams_this_year.append(`${item.exams}`);
      });
    });
  }

  get_all_exams_this_year();

  setInterval(() => {
    class_end_year_table.ajax.reload();
  }, 10000000);


});
