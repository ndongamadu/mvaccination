if (typeof _$ == 'undefined') {
	function _$(elementId) { return document.getElementById(elementId); }
}

function DataTable() {
	this.init();
}

DataTable.prototype.init = function() {
	// Initial data
	this.ascending = null;
	this.enabledSort = false;
	this.sortKey = "";
	this.currentIndex = 0;
	this.originalData = null;
	this.filteredData = [];
	this.currentPage = 1;
	this.rowsPerPage = 25;
	this.search = "";
	this.numOfPages = 1;
	this.containerid = "dataTable";
	let self = this;
};

DataTable.prototype.refreshTable = function() {
	
	
	if (this.search.length != 0) {
		this.filteredData = this.filterRows(this.search);
		
	} else if(this.enabledSort == false) {
		this.filteredData = JSON.parse(JSON.stringify(this.originalData));
	}
	this.renderPagination(this.filteredData);
	this.renderData(this.filteredData);
};

DataTable.prototype.filterRows = function(search) {
	if(this.enabledSort){
		return this.filteredData.filter((row) => {
		return Object.values(row).some((value) => {
			if (value){
				return value.toString().toLowerCase().indexOf(search.toLowerCase()) != -1;
			}
		});
	});
	}
	return this.originalData.filter((row) => {
		return Object.values(row).some((value) => {
			if (value){
				return value.toString().toLowerCase().indexOf(search.toLowerCase()) != -1;
			}
		});
	});
};

DataTable.prototype.renderData = function(rows) {
	_$(this.containerid).innerHTML = "";
	let self = this;
	rows = rows.slice(this.currentIndex, this.currentIndex + this.rowsPerPage);
	if(rows.length == 0) {
		var textNode = document.createElement("p");
		textNode.innerHTML = "No results displayed.";
		_$(this.containerid).appendChild(textNode);
	}
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var thead = document.createElement("thead");
	table.className = "table table-striped m-b-1";
	thead.className = "thead-default";
	for (let key in rows[0]) {
		let th = document.createElement("th");
		th.onclick = function() {
			self.sortKey = key;
			if(self.ascending == null){
				_$("sort-"+key).innerHTML = "&#9652;";
				self.ascending = true;
				asc = 0;
			} else if(self.ascending == true) {
				_$("sort-"+key).innerHTML = "&#9662;";
				self.ascending = false;
				asc = 1;
			} else if(self.ascending == false) {
				_$("sort-"+key).innerHTML == "";
				self.ascending = null;
				self.filteredData = JSON.parse(JSON.stringify(self.originalData));
				self.refreshTable();
				return;
			}
			self.sortRows(key,asc);
		}
		th.innerHTML = key.charAt(0).toUpperCase() + key.slice(1);
		var span = document.createElement("span");
		span.id = "sort-"+key;
		if(self.ascending == true &&  self.sortKey == key){
			span.innerHTML = "&#9652;";
		} else if(self.ascending == false &&  self.sortKey == key) {
			span.innerHTML = "&#9662;";
		} else if(self.ascending == null &&  self.sortKey == key) {
			span.innerHTML == "";
		}
		th.appendChild(span);
		tr.appendChild(th);
		thead.appendChild(tr);
	}
	table.appendChild(thead);
	for(let row of rows){
		let tr = document.createElement("tr");
		for(let key in row){
			let td = document.createElement("td");
			td.onclick = function() {
				let input = document.createElement("input");
				if(td.childNodes[0].tagName != "INPUT") {
					input.className = "editInput";
					input.value = row[key];
					textNode = td.childNodes[0];
					td.replaceChild(input, textNode);
					input.select();
					input.onblur = function() {
						row[key] = this.value;
						this.parentNode.innerHTML = this.value;
					}
				}

			}
			
			td.innerHTML = row[key];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	_$(this.containerid).appendChild(table);
};

DataTable.prototype.sortRows = function(key,asc) {
	
	var sort_by = function(field, reverse){

		reverse = !reverse ? 1 : -1;
		
		return function (a, b) {
			return a = a[key], b = b[key], reverse * ((a > b) - (b > a));
		} 
	}
	this.filteredData.sort(sort_by(key, asc));
	this.enabledSort = true;
	this.refreshTable();
};

DataTable.prototype.renderPagination = function(data) {
	_$("pagination").innerHTML = "";
	let self = this;
	var firstBtn = document.createElement("button");
	var leftBtn = document.createElement("button");
	var rightBtn = document.createElement("button");
	var lastBtn = document.createElement("button");

	firstBtn.innerHTML = "<<";
	leftBtn.innerHTML = "<";
	rightBtn.innerHTML = ">";
	lastBtn.innerHTML = ">>";

	_$("pagination").appendChild(firstBtn);
	firstBtn.onclick = function() {
		self.movePages(1 - self.currentPage);
	}
	_$("pagination").appendChild(leftBtn);
	leftBtn.onclick = function() {
		self.movePages(-1);
	}
	this.updatePagination(data);
	_$("pagination").appendChild(rightBtn);
	rightBtn.onclick = function() {
		self.movePages(1);
	}
	_$("pagination").appendChild(lastBtn);
	lastBtn.onclick = function() {
		self.movePages(self.numOfPages - self.currentPage);
	}

	if(self.currentPage == 1) {
		firstBtn.disabled = true;
		leftBtn.disabled = true;
	}
	
	if(self.currentPage == self.numOfPages) {
		rightBtn.disabled = true;
		lastBtn.disabled = true;
	}

}

DataTable.prototype.updatePagination = function(data) {
	this.numOfPages = Math.ceil(data.length / this.rowsPerPage);
	let self = this;
	var current = document.createElement("input");
	current.id = "currentPage";
	current.className = "pageInput";
	current.value = this.currentPage;
	
	let event = function (e) {
		if(e.type == "blur" || (e.type == "keyup" && e.keyCode == 13)) {
			let pageNum = this.value;
			if (isNaturalNumber(pageNum) && pageNum > 0 && pageNum <= self.numOfPages) {
				self.movePages(pageNum - self.currentPage);
			} else {
				self.movePages(0);
			}

			function isNaturalNumber(number) {
				number = number.toString();
				var n1 = Math.abs(number);
				var n2 = parseInt(number, 10);
				return !isNaN(n1) && n2 === n1 && n1.toString() === number;
			}
		}
		
	}
	current.onblur = event;
	current.onkeyup = event;
	_$("pagination").appendChild(current);
	paginator = document.createTextNode("");
	paginator.appendData(" of ");
	paginator.appendData(this.numOfPages+" ");
	_$("pagination").appendChild(paginator);
}

DataTable.prototype.movePages = function(num) {
	this.currentPage += num;
	_$("currentPage").value = this.currentPage;
	this.currentIndex = this.currentIndex + (num * this.rowsPerPage);
	this.refreshTable();
}