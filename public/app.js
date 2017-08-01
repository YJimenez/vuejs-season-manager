let vm = new Vue({
	el: '#app',
	data: {
		title: 'Video Episodes Manager',
		subtitle: 'Powered with node.js, express, ejs, vue.js, bootstrap',
		seasons: '',
		seasonId:'',
		episodes: '',
		episodeSelected: '',
		searchString:''
	},
	computed: {
		buttonMenuName: function(){
			console.log(false);
			return true
		}
	},
	methods: {
		filterEpisodes: seasonId => {
			vm.seasonId = seasonId;
			updateVMValues( seasonId, getEpisodes() );
		},
		getEpisodeDescription: episodeId => {
			vm.episodeSelected = vm.episodes.find( episode => {
				return episode.id === episodeId
			});
		},
		filterString: function(){
			vm.searchString = event.target.value;
			updateVMValues( vm.seasonId, getEpisodes() );
		}
	},
})

function initialValues(seasonsArray, seasonId){
	vm.seasons = seasonsArray;
	updateVMValues(seasonId, getEpisodes(seasonId));
}

function getEpisodes(){
	
	let episodesArray = [];
	
	if( vm.seasonId === '' ){
		vm.seasons.forEach( season => {
			season.episodes.map( episode => {
				episodesArray.push( episode );
			})
		});
	} else {
		let seasonsArrayFiltered = vm.seasons.find( season => {
			return season.id === vm.seasonId
		});
		seasonsArrayFiltered.episodes.forEach( episode => {
			episodesArray.push( episode );
		});
	}
	
	if( vm.searchString !== '' ){
		episodesArray = episodesArray.filter( filterEpisodes => {
			return filterEpisodes.description_large.toString().includes(vm.searchString)
			|| filterEpisodes.title_episode.includes(vm.searchString)
		});
	}
	
	return episodesArray
}

function updateVMValues(seasonId, episodesArray){
	vm.seasonId = seasonId;
	vm.episodes = episodesArray;
}

