			var rootHandler = document.getElementById('root');
			var contentHandler = document.getElementById('quoteContent');
			var formContentHandler = document.getElementById('formContent');
			var formQuote,formAuthor;
			var myQuote;
			var localQuotes;
			var submitHandler = document.getElementById('submit');
			contentHandler.innerHTML='';
			if(localStorage.quotes) {
			var quotes = JSON.parse(localStorage.quotes);
			console.log(quotes);
			listAllQuotes(quotes);
			
			function listAllQuotes(quotes) {
				contentHandler.innerHTML='';
				for(let i = 0; i < quotes.length ; i++ ) {
					contentHandler.innerHTML += buildQuote(i,quotes[i]);
				}
			}
			} else {
				contentHandler.innerHTML +=`<div class="alert alert-primary" role="alert" ><h2> No Quotes Saved in Local </h2>`;
				rootHandler.appendChild(contentHandler);
			}
			function buildQuote(i,quote) {
			return `<div class="alert alert-primary" role="alert" id=${i} ><h2> "${quote.quote}" </h2> \n <h4> ~${quote.author} </h4><button type="button" class="btn btn-primary" onclick=deleteQuote(${i})> Trash </button> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick= editForm(${i})>Edit</button></div>`;
			}
			
			function deleteQuote(id) {
				console.log(id);
				localQuotes = JSON.parse(localStorage.quotes);
				localQuotes.splice(id,1);
				localStorage.setItem("quotes",JSON.stringify(localQuotes));
				listAllQuotes(localQuotes);
			}
			
			function editForm(id) {
				let x = document.getElementById(id);
				localQuotes = JSON.parse(localStorage.quotes);
				myQuote = localQuotes[x.id];
				console.log(myQuote);
				console.log('Test');
				var output = `
					<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
					<div class="modal-content">
					<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form id=testForm>
						<div class="form-group">
						<label for="quote"></label>
						<input type="text" class="form-control" id="quote" onblur="blurFunction(quote)" aria-describedby="emailHelp" value="${myQuote.quote}">
						<label for="author"></label>
						<input type="text" class="form-control" id="author" onblur="blurFunction(author)" aria-describedby="emailHelp" value="${myQuote.author}">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
						<button type="submit" id="submit" class="btn btn-primary" >Save changes</button>
					</form>
					</div>
					</div>
					</div>
					</div>`;
		formContentHandler.innerHTML = output;
		formHandle = document.getElementById('testForm');
		formHandle.addEventListener('submit', function(e){
			formQuote = document.getElementById('quote');
			formAuthor = document.getElementById('author');
			if( formQuote.value && formAuthor.value) {
			myQuote.quote = `${formQuote.value}`;
			myQuote.author = `${formAuthor.value}`;
               console.log('form was submitted'); 
			 localStorage.setItem("quotes",JSON.stringify(localQuotes));  
			 listAllQuotes(localQuotes);
			}
			else {
				alert ("No changes made, because the fields were empty");
			}
		});
				
				
			}
			
		
		function blurFunction(id){
			if(!id.value) {
				alert ("It is a required field");
			}
		}
		