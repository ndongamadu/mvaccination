var dataTable = new DataTable();
_$("rowsPerPage").addEventListener( 'change', function(){
    dataTable.rowsPerPage = parseInt(this.value);
    dataTable.currentPage = 1;
    dataTable.currentIndex = 0;
    dataTable.refreshTable();
});
_$("search").addEventListener( 'keyup', function(){
    dataTable.currentPage = 1;
    dataTable.currentIndex = 0;
    dataTable.search = this.value;
    dataTable.refreshTable();
});
DataTable.prototype.onload = function(source) {
    this.loadData(source);
};

DataTable.prototype.dataLoaded = function(data) {
    this.intializeData(data);
};

DataTable.prototype.intializeData = function(data) {
    let self = this;
    this.originalData = data;
    this.filteredData = JSON.parse(JSON.stringify(this.originalData));
    this.renderPagination(data);
    this.renderData(data);
};

DataTable.prototype.loadData = function(source) {
	var self = this;

	if (!window.XMLHttpRequest) {
		alert("Cannot load a JSON on this browser!"); 
		return false;
	}

    var xhr = new XMLHttpRequest();
    xhr.open("GET", source, true);
	xhr.onreadystatechange = function () {
		if(xhr.readyState == 4) {
			if (!xhr.responseText) { console.error("Could not load JSON"); return false; }
            if (!self.isValidJSON(xhr.responseText)) { console.error("Invalid JSON data obtained from url '" + url + "'"); return false;}
			self.dataLoaded(JSON.parse(xhr.response));
		}
	};
	xhr.send();

	return true;
};

DataTable.prototype.isValidJSON = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};