# Display the Directory structure of the path

## Two Approaches:
1. In ```printDirectoryTree.js``` file, the algorithm simply traverses each and every file and folder in the directory and prints out it's name with proper indentation i.e. in the form of a Tree.
```
-- WeatherApp
 |      |-- config.js
 |      |-- icons
 |      |       |-- atmosphere.svg
 |      |       |-- clouds.svg
 |      |       |-- drizzle.svg
 |      |       |-- loading.gif
 |      |       |-- rain.svg
 |      |       |-- search.png
 |      |       |-- snow.svg
 |      |       |-- storm.svg
 |      |       |-- sun.svg
 |      |-- index.html
 |      |-- script.js
 |      |-- style.css
 ```

 2. In ```printDirectoryJSON.js``` file, the algorithm returns a JSON object, where each directory is the key, and it's sub files and folders are it's value. For files, the value is null.
 ```
 { WeatherApp:
    { 'config.js': null,
        icons:
            {   'atmosphere.svg': null,
                'clouds.svg': null,
                'drizzle.svg': null,
                'loading.gif': null,
                'rain.svg': null,
                'search.png': null,
                'snow.svg': null,
                'storm.svg': null,
                'sun.svg': null 
            },
        'index.html': null,
        'script.js': null,
        'style.css': null 
    } 
}
```