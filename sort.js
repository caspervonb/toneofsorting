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
  var sorted;
  for (var i = 0; i < n; i++) {
    sorted = true;
    for (var j = 0; j < n - i - 1; j++) {
      if (test(a, j + 1, j) < 0) {
        sorted = false;
        swap(a, j, j + 1);
      }
    }
    if(sorted == true){
        break;
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

function combSort(a) {
  var shrink = 1.3;

  var swapped = false;
  var gap = a.length;

  while ((gap > 1) || swapped)
  {
    if (gap > 1) {
      gap = Math.floor(gap / shrink);
    }

    swapped = false;

    for (var i = 0; gap + i < a.length; ++i) {
      if (test(a, i, i + gap) > 0) {
	swap(a, i, i + gap);
	swapped = true;
      }
    }
  }
}

function gnomeSort(a) {
  var n = a.length;
  for (var i = 1; i < n; true) {
    if (test(a, i, i - 1) >= 0) {
      ++i;
    } else {
      swap(a, i, i - 1);
      if (i > 1) {
	--i;
      }
    }
  }
}

function heapSort(a) {
  var n = a.length;
  var i = Math.floor(n / 2);

  while (true) {
    if (i > 0) {
      i--;
    } else {
      n--;
      if (n == 0) return;
      swap(a, 0, n);
    }

    var parent = i;
    var child = i * 2 + 1;

    while (child < n) {
      if (child + 1 < n && test(a, child + 1, child) > 0) {
	child++;
      }

      if (test(a, child, parent) > 0) {
	swap(a, parent, child);
	parent = child;
	child = parent*2+1;
      }
      else {
	break;
      }
    }
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

function pivot(aa, type, left, right) {
  if (typeof(left) === 'undefined') left = 0;
  if (typeof(right) === 'undefined') right = aa.length() - 1;
  var p = null;
  if (type === 'random') {
    var p = left + Math.floor((right - left + 1) * Math.random());
  } else if (type === 'first') {
    p = left;
  } else if (type === 'last') {
    p = right;
  } else if (type === 'middle') {
    p = Math.round((left + right) / 2);
  } else {
    throw new TypeError('Invalid p type ' + type);
  }

  return p;
}

function partition(aa, type, left, right) {
  var p = pivot(aa, type, left, right);
  swap(aa, p, right);

  p = left;
  for (var i = left; i < right; i++) {
    if (test(aa, i, right) < 0) {
      if (i != p) {
        swap(aa, i, p);
      }
      p += 1
    }
  }

  swap(aa, right, p);

  return p;
}

function quickSort(aa, type, left, right) {
  var n = aa.length;
  if (typeof(left) === 'undefined') left = 0;
  if (typeof(right) === 'undefined') right = n - 1;

  if (left >= right) return;

  var p = partition(aa, type, left, right);
  quickSort(aa, type, left, p - 1);
  quickSort(aa, type, p + 1, right);
}

self.onmessage = function(event) {
  var sort = eval(event.data[0]);
  sort(event.data[1], event.data[2]);

  console.log(event.data[1]);
};
