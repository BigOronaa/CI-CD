pipeline {
    agent any

    environment {
        STAGING_URL = "staging.example.com"
        PRODUCTION_URL = "prod.example.com"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'echo "Dependencies installed successfully."'
            }
        }

        stage('Test') {
    steps {
        script {
            echo 'Running tests...'
            // Simulate test success (no forced failure)
            def testStatus = sh(script: 'echo 0', returnStatus: true) // 0 = success
            if (testStatus != 0) {
                error("Tests failed!")  // triggers failure handling if a real failure occurs
            } else {
                echo "All tests passed!"
            }
        }
    }
}

        stage('Package') {
            steps {
                echo 'Packaging application...'
                sh 'echo "Application packaged successfully."'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to staging at ${env.STAGING_URL}..."
                sh 'echo "Deployment to staging completed."'
            }
        }

        stage('Approval') {
            steps {
                input message: "Approve deployment to Production?", ok: "Deploy"
            }
        }

        stage('Deploy to Production') {
            steps {
                echo "Deploying to production at ${env.PRODUCTION_URL}..."
                sh 'echo "Deployment to production completed successfully."'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed! Initiating automated rollback...'

            script {
                // Step 1: Get previous commit
                def previousCommit = sh(
                    script: "git rev-parse HEAD~1",
                    returnStdout: true
                ).trim()
                
                echo "Rolling back to previous commit: ${previousCommit}"
                
                // Step 2: Checkout previous commit
                sh "git checkout ${previousCommit}"
                
                // Step 3: Rebuild and redeploy previous stable version
                echo "Rebuilding previous stable version..."
                sh 'echo "Dependencies installed successfully."'
                sh 'echo "Application packaged successfully."'
                echo "Redeploying to staging..."
                sh 'echo "Deployment to staging completed."'
                echo "Redeploying to production..."
                sh 'echo "Deployment to production completed successfully."'
                
                echo 'Rollback and redeployment completed.'
            }

            echo 'Sending failure notification to team (simulated)...'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        unstable {
            echo 'Pipeline completed with warnings.'
        }
    }
}
