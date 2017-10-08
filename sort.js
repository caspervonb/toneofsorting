function test(array, i, j) {
  self.postMessage(['test', i, j]);

  return array[i] - array[j];
}

function swap(array, i, j) {
  self.postMessage(['swap', i, j]);

  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function bubbleSort(a) {
  var n = a.length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n - i - 1; j++) {
      if (test(a, j + 1, j) < 0) {
        swap(a, j, j + 1);
      }
    }
  }
}


function cocktailSort(a) {
  var n = a.length;
  var left = 0;
  var right = n - 1;
  while (left < right) {
    var new_right = right - 1;
    for (var i = left; i + 1 <= right; i++) {
      if (test(a, i + 1, i) < 0) {
        swap(a, i + 1, i);
        new_right = i;
      }
    }
    right = new_right;
    var new_left = left + 1;
    for (var i = right; i - 1 >= left; i--)  {
      if (test(a, i, i - 1) < 0) {
        swap(a, i, i - 1);
        new_left = i;
      }
    }
    left = new_left;
  }
}

function insertionSort(a) {
  var n = a.length;
  for (var i = 1; i < n; i++) {
    for (var j = i; j > 0 && test(a, j, j - 1) < 0; j--) {
      swap(a, j, j - 1);
    }
  }
}

function oddEvenSort(a) {
  var n = a.length;
  var sorted = false;
  while (!sorted) {
    sorted = true;
    for (var p = 0; p <= 1; p++) {
      for (var i = p; i + 1 < n; i += 2) {
        if (test(a, i + 1, i) < 0) {
          swap(a, i + 1, i);
          sorted = false;
        }
      }
    }
  }
}

function selectionSort(a) {
  var n = a.length;
  for (var i = 0; i < n - 1; i++) {
    var k = i;
    for (var j = i; j < n; j++) {
      if (test(a, j, k) < 0) {
        k = j;
      }
    }

    swap(a, i, k);
  }
}

self.onmessage = function(event) {
  var sort = eval(event.data[0]);
  sort(event.data[1], 'middle');

  console.log(event.data[1]);
};
